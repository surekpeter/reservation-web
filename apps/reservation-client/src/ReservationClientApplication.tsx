import {Route, Routes, useNavigate} from 'react-router-dom'
import {initializeI18n} from '@consuri/core-services'
import {PageLayout} from '@consuri/core-ui-components'
import {ErrorPage, HomePage, NotFoundPage} from './pages'

import texts_sk from './texts/texts_sk.json'
import texts_sk_core_ui from '@consuri/core-ui-components/texts/texts_sk.json'

import './style/index.scss'
import SecuredPageWrapper from "../../../libs/core-auth/src/pages/SecuredPageWrapper";

const i18n = initializeI18n({sk: [texts_sk_core_ui, texts_sk]})

const ReservationClientApplication = () => {
    const navigate = useNavigate()

    return (
        <SecuredPageWrapper>
            <PageLayout>
                <Routes>
                    <Route index Component={() => <HomePage/>}/>
                    <Route path='/error' element={<ErrorPage/>}/>
                    <Route path='/login' element={<ErrorPage/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
            </PageLayout>
        </SecuredPageWrapper>
    )
}

export default ReservationClientApplication