// external
import {useEffect, useRef, useState} from 'react'
import {Transition} from 'react-transition-group'
import {Toast as BSToast} from 'react-bootstrap'
// icons
import {FaCheckCircle} from '@react-icons/all-files/fa/FaCheckCircle'
import {FaTimes} from '@react-icons/all-files/fa/FaTimes'
import {FaTimesCircle} from '@react-icons/all-files/fa/FaTimesCircle'
import {wait} from '@consuri/core-services'

const BEFORE_ENTER_TIMEOUT_MS = 250
const ON_SCREEN_DURATION_MS = 5000
const TRANSITION_DURATION_MS = 800

// types
export type ToastState = 'error' | 'success'

interface ToastProps {
    message: string,
    type: ToastState
    afterClose?: () => void
}

export const Toast = ({type, message, afterClose}: ToastProps) => {
    const [state, setState] = useState<ToastState | ''>('')
    const nodeRef = useRef(null)

    const close = () => {
        setState('')
        if (afterClose) {
            wait(TRANSITION_DURATION_MS).then(afterClose)
        }
    }

    useEffect(() => {
        wait(BEFORE_ENTER_TIMEOUT_MS).then(() => {
            setState(type)
        })
        wait(ON_SCREEN_DURATION_MS).then(close)
    }, [type])

    const StartIcon = type === 'error' ? FaTimesCircle : FaCheckCircle

    return (
        <Transition
            nodeRef={nodeRef}
            in={!!state.length}
            timeout={TRANSITION_DURATION_MS}
            mountOnEnter
            unmountOnExit
        >
            {(transitionState) => (
                <BSToast
                    ref={nodeRef}
                    className={`${type} ${transitionState}`}
                    style={{
                        transition: `opacity ${TRANSITION_DURATION_MS}ms ease-in-out`,
                    }}
                >
                    <StartIcon size={16} className='my-auto'/>
                    <div className='ms-3'>
                        <BSToast.Header className='fw-bold' closeButton={false}>
                            {<title></title>}
                        </BSToast.Header>
                        <BSToast.Body>{message}</BSToast.Body>
                    </div>
                    <FaTimes size={14} className='hover-pointer ms-auto' onClick={close}/>
                </BSToast>
            )}
        </Transition>
    )
}
