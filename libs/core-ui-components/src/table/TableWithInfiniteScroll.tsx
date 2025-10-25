import React, {ReactNode} from 'react';
import {useInfiniteApiQuery} from '@consuri/core-services';

import Table from './Table';
import {Button} from 'react-bootstrap';

const PAGE_SIZE = 25;

interface Props<T> {
    itemKey: keyof T;
    queryKey: string | string[];
    url: string;
    pageSize?: number;
    noDataMsg: string;
    errorMsg: string;
    loadMoreLabel: string;
    onRowClick?: (item: T) => void;
    forceDataReload?: (sortBy: keyof T, sortDirection: 'ASC' | 'DESC') => void;
    onNewItemLoaded?: (newItems: T[]) => void;
    columns: {
        identifier: string,
        title: string,
        dataField?: keyof T,
        getter?: (fieldValue: T) => ReactNode,
        sortable?: boolean,
    }[];
}

const TableWithInfiniteScroll = <T, >({
                                          itemKey,
                                          noDataMsg,
                                          errorMsg,
                                          queryKey,
                                          loadMoreLabel,
                                          url,
                                          pageSize = PAGE_SIZE,
                                          columns,
                                          onRowClick,
                                          forceDataReload,
                                          onNewItemLoaded
                                      }: Props<T>) => {

    const getPaginatedContent = useInfiniteApiQuery<T>(queryKey, url, pageSize, undefined, onNewItemLoaded);

    return (
        <>
            <Table<T>
                itemKey={itemKey}
                noDataMsg={noDataMsg}
                errorMsg={errorMsg}
                status={getPaginatedContent.status}
                data={getPaginatedContent.data}
                onRowClick={onRowClick}
                forceDataReload={forceDataReload}
                columns={columns}/>
            {getPaginatedContent.totalNumOfItems - getPaginatedContent.data.length > 0 &&
                <Button onClick={() => getPaginatedContent.requestNextPage()}>{loadMoreLabel}</Button>}
        </>
    );
};

export default TableWithInfiniteScroll;
