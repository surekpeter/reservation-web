import {RequestScopedHeader, StandardHeaders, useGet} from '@consuri/core-services'

export const useUserReservation = (
    standardRequestHeaders?: StandardHeaders<RequestScopedHeader>,
    throwExceptionIntoRender = false,
) => {
    return useGet<{
        reservationId: string,
        activity: string
    }[]>(
        `/api/reservation`,
        [],
        standardRequestHeaders,
        throwExceptionIntoRender,
    )
}