import Spinner from '../spinner'
import {ErrorAlert} from '../error'
import {ResponseError} from '@consuri/core-services'

enum ResponseFlag {
    isLoading = 'isLoading',
    hasError = 'hasError',
}

interface ResponseState {
    isLoading: boolean
    hasError: ResponseError | undefined
}

interface Props {
    responseStates: Array<ResponseState>
    errorAlertText: string
    children: JSX.Element
}

const anyStateIsTrue = (states: Array<ResponseState>, attribute: ResponseFlag): boolean => {
    return states.some((state) => state[attribute])
}

const ResponseWrapper = (props: Props) => {
    if (anyStateIsTrue(props.responseStates, ResponseFlag.isLoading)) {
        return <Spinner key={'spinner-wrapper'}/>
    } else if (anyStateIsTrue(props.responseStates, ResponseFlag.hasError)) {
        return (
            <ErrorAlert
                errorText={props.errorAlertText}
            />
        )
    } else {
        return <>{props.children}</>
    }
}
export default ResponseWrapper
