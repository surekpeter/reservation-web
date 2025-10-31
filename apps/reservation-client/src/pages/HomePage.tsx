import React from 'react'
import {PageLayout} from '@consuri/core-ui-components'
import {useUserReservation} from '../hooks'

export const HomePage = () => {
    const userReservationResponse = useUserReservation()
    return (
        <PageLayout>
            <div>HOME PAGE</div>
        </PageLayout>
    )
}
