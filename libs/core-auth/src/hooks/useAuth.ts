import {useGet, RequestScopedHeader, StandardHeaders} from "@consuri/core-services";

export interface User {
    id: string;
    email: string;
    name: string;
}

export const useAuth = (
    standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
    throwExceptionIntoRender = false,
) => {
    return useGet<User | null>(
        `/auth/verify`,
        {
            email: "", name: "",
            id: ''
        },
        standardRequestHeaders,
        throwExceptionIntoRender,
    )
}