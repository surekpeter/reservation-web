import { useTranslation } from 'react-i18next'
import { PageLayout } from '@consuri/core-ui-components'

export const NotFoundPage = () => {
  const { t } = useTranslation('not-found-page')

  return (
    <PageLayout>
      <h5 className='mb-4'>{t('message')}</h5>
    </PageLayout>
  )
}
