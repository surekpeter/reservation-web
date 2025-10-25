import { Spinner } from 'react-bootstrap'

export const SpinnerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='d-flex justify-content-center align-items-center w-100 h-100 spinner-wrapper'>
      <div className='m-auto'>{children}</div>
    </div>
  )
}

const MySpinner = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )
}
export default MySpinner
