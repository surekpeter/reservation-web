import { Alert } from 'react-bootstrap'

const DEFAULT_ERROR_TEXT = 'Could not load data, please try again later'

interface Props {
  errorText?: string
}

const ErrorAlert = (props: Props) => {
  return (
    <Alert key={'danger'} variant={'danger'}>
      {props?.errorText || DEFAULT_ERROR_TEXT}
    </Alert>
  )
}
export { ErrorAlert }
