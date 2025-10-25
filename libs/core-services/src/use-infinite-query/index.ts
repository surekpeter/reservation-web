import apiFetcher from '../api-fetcher';
import {useInfiniteQuery} from 'react-query';
import {useCallback, useMemo} from 'react';

interface Paginated<T> {
    content: T[];
    totalNumOfElements: number;
    totalNumOfPages: number;
    pageIndex: number;
}

const useInfiniteApiQuery = <T>(queryKey: string | string[], url: string, pageSize: number, urlParams?: {
    [key: string]: string;
}, onNewItemLoaded?: (newItems: T[]) => void): {
    status: 'error' | 'loading' | 'success',
    totalNumOfItems: number,
    totalNumOfPages: number,
    data: T[],
    requestNextPage: () => void
} => {

    const queryFunction = useCallback(async <T>({pageParam}: {
        pageParam?: number
    }): Promise<Paginated<T>> => {
        const response = await apiFetcher.get<Paginated<T>>(url, undefined, {
            page: pageParam || 0,
            size: pageSize
        })
        return response.responseData;
    }, [url, pageSize, urlParams]);
    const qk = Array.isArray(queryKey) ? queryKey : [queryKey];
    const response = useInfiniteQuery<Paginated<T>>([qk], queryFunction, {
        keepPreviousData: true,
        getNextPageParam: (lastPage) => {
            return lastPage.pageIndex + 1;
        }
    });

    return useMemo(() => {
        const status: 'error' | 'loading' | 'success' = response.isFetching ? 'loading' : response.isError ? 'error' : 'success';
        let content: T[] = [];
        let totalNumOfItems = 0, totalNumOfPages = 0;
        if (response.data) {
            content = response.data.pages.flatMap(it => it.content);
            if (onNewItemLoaded) {
                onNewItemLoaded(content);
            }
            if (response.data.pages.length > 0) {
                totalNumOfItems = response.data.pages[0].totalNumOfElements;
                totalNumOfPages = response.data.pages[0].totalNumOfPages;
            }
        }
        return {status, totalNumOfItems, totalNumOfPages, data: content, requestNextPage: response.fetchNextPage};
    }, [onNewItemLoaded, response.data, response.fetchNextPage, response.isError, response.isFetching]);
};

export {useInfiniteApiQuery};
