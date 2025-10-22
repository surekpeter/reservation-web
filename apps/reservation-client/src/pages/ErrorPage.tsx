import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageLayout } from '@consuri/core-ui-components'

export const ErrorPage = () => {
  const { state } = useLocation()
  const { t } = useTranslation('error-page')
  const errorTitle = state?.errorTitle || t('title')
  const errorMessage = state?.errorMessage || t('message')

  return (
    <PageLayout>
      <h5 className='mb-4'>{errorMessage}</h5>
    </PageLayout>
  )
}
