import {RequestScopedHeader, StandardHeaders} from "@consuri/core-services";
import useGet from "../../../core-services/src/use-get";

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