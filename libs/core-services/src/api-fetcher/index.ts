import axios, {AxiosRequestConfig} from 'axios'
import {v4 as uuidv4} from 'uuid'

type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T
}

type RequestScopedHeader = 'Authorization' | 'ClinicalTrial' | 'RequestId' | 'TimeZone'

type GlobalScopedHeader = 'ClientId' | 'ClinicalTrial' | 'SessionId'

type StandardHeaders<T extends RequestScopedHeader | GlobalScopedHeader> = PartialRecord<T, string>

let _apiUrl = ''


const get = async <T>(
    url: string,
    standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
    urlParams?: Record<string, string | number>
) => {

    const headers = await getRequestConfig(standardRequestHeaders)
    const response = await axios.get<T>(`${_apiUrl}${url}`, {...headers, params: urlParams, withCredentials: true})
    const responseData: T = response.data
    const status = response.status
    return {responseData, status}
}

const post = async <T, R>(
    url: string,
    data: T,
    standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
) => {
    const response = await axios.post<R>(
        `${_apiUrl}${url}`,
        data,
        await getRequestConfig(standardRequestHeaders),
    )
    const responseData: R = response.data
    const status = response.status
    return {responseData, status}
}

const put = async <T, R>(
    url: string,
    data: T,
    standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
) => {
    const response = await axios.put<R>(
        `${_apiUrl}${url}`,
        data,
        await getRequestConfig(standardRequestHeaders),
    )
    const responseData: R = response.data
    const status = response.status
    return {responseData, status}
}

const getRequestConfig = async (
    standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
): Promise<AxiosRequestConfig> => {
    const headers: StandardHeaders<RequestScopedHeader> = {
        // Authorization: `Bearer ${getToken()}`,
        RequestId: uuidv4(),
        TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
    return {headers: {...headers, ...standardRequestHeaders}}
}

const updateGlobalContextHeader = (headers: StandardHeaders<GlobalScopedHeader>) => {
    for (const key in headers) {
        // @ts-ignore
        axios.defaults.headers.common[key] = headers[key]
    }
}

const configure = (apiUrl: string, headers: StandardHeaders<GlobalScopedHeader>) => {
    if (_apiUrl.length > 0) {
        throw Error('Api-fetcher module already configured')
    }
    _apiUrl = apiUrl
    for (const key in headers) {
        // @ts-ignore
        axios.defaults.headers.common[key] = headers[key]
    }
}
export default {get, post, put, configure, updateGlobalContextHeader}

export type {StandardHeaders, RequestScopedHeader, GlobalScopedHeader}
