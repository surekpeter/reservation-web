import {BaseSyntheticEvent, ReactNode, useEffect} from 'react'
import {isAxiosError} from 'axios'
import type {FieldErrors, UseFormReturn} from 'react-hook-form'
import {DefaultValues, FieldValues, FormProvider, useForm} from 'react-hook-form'
import {Form as BootstrapForm, FormProps as BootstrapFormProps,} from 'react-bootstrap'
import Spinner from '../spinner'

interface FormProps<T>
    extends Omit<BootstrapFormProps, 'onSubmit' | 'onError' | 'id' | 'noValidate' | 'children'> {
    formId?: string
    initialValues: T
    resetValues?: T
    submit?: (data: T, m: UseFormReturn, e?: BaseSyntheticEvent) => void
    onError?: (errors: FieldErrors, m: UseFormReturn, e?: BaseSyntheticEvent) => void
    onSubmitSuccessful?: () => void
    onWatch?: (data: T, input: any, m: UseFormReturn) => void
    resetCount?: number
    resetFieldName?: string
    children: ((m: UseFormReturn) => ReactNode) | ReactNode
    renderChildrenWithProps?: boolean
    allowSuccessFormFeedback?: boolean
    disableFormFeedback?: boolean
}

const Form = <T extends DefaultValues<FieldValues> | undefined>({
                                                                    formId,
                                                                    initialValues,
                                                                    resetValues,
                                                                    children,
                                                                    submit,
                                                                    onError,
                                                                    onSubmitSuccessful,
                                                                    onWatch,
                                                                    resetCount = 0,
                                                                    resetFieldName = '',
                                                                    renderChildrenWithProps = false,
                                                                    allowSuccessFormFeedback = false,
                                                                    disableFormFeedback = false,
                                                                    ...props
                                                                }: FormProps<T>) => {
    const methods = useForm({
        defaultValues: initialValues,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        shouldFocusError: true,
    })
    const resetForm = () => {
        if (resetValues) {
            methods.reset(resetValues)
        } else {
            methods.reset(initialValues)
        }
    }
    const resetField = (field: string) => {
        if (resetValues) {
            methods.setValue(field, resetValues[field])
        } else {
            methods.resetField(field)
        }
    }

    const {errors, isLoading, isSubmitSuccessful, isSubmitting} = methods.formState
    const isWatching = typeof onWatch === 'function'

    useEffect(() => {
        if (!isWatching) return
        const subscription = methods.watch((data, input) => {
            if (data) onWatch(data as T, input, methods)
        })
        return () => subscription?.unsubscribe()
    }, [methods.watch, onWatch])

    useEffect(() => {
        if (resetCount !== 0) {
            resetForm()
        }
    }, [methods.reset, resetCount])

    useEffect(() => {
        if (resetFieldName !== '') {
            resetField(resetFieldName)
        }
    }, [resetFieldName])

    return (
        <FormProvider {...methods}>
            {isLoading && <Spinner/>}
            {!isLoading && (
                <>
                    <BootstrapForm
                        id={formId}
                        noValidate
                        onSubmit={methods.handleSubmit(
                            async (data, e) => {
                                try {
                                    await submit?.(data as T, methods, e)
                                } catch (errors) {
                                    console.error('Errors in Form: ', {errors})

                                    if (isAxiosError(errors)) {
                                        const fieldNames = Object.keys(initialValues as object)
                                        const errorsObj = errors.response?.data?.errors
                                        const isAnyErrorFieldSpecific =
                                            errorsObj &&
                                            fieldNames &&
                                            Object.keys(errorsObj).some((key) => fieldNames.includes(key))
                                        const errorCode =
                                            errors.response?.data?.internalErrorCode ||
                                            errors.response?.data?.status ||
                                            ''
                                        const errorMessage =
                                            errors.response?.data?.message || errors.response?.data?.detail || ''

                                        // axios error is field specific
                                        if (isAnyErrorFieldSpecific) {
                                            for (const key in errorsObj) {
                                                if (fieldNames.includes(key)) {
                                                    methods.setError(key, {
                                                        type: errorsObj[key] || '',
                                                        message: errorsObj[key] || '',
                                                    })
                                                }
                                            }
                                            return
                                        }

                                        // axios error is general
                                        if (errorCode || errorMessage) {
                                            methods.setError('root', {
                                                type: errorCode,
                                                message: errorMessage,
                                            })
                                            return
                                        }

                                        return
                                    }
                                    console.error(errors)
                                    if (errors instanceof Error) {
                                        methods.setError('root', {
                                            type: errors.name,
                                            message: errors.message,
                                        })
                                        return
                                    } else {
                                        methods.setError('root', {
                                            type: 'error',
                                            message: errors?.toString() ?? "Error occoured",
                                        })
                                    }
                                }
                                if (onSubmitSuccessful) {
                                    onSubmitSuccessful()
                                }
                            },
                            (errors, e) => {
                                onError?.(errors, methods, e)
                            },
                        )}
                    >
                        {
                            (renderChildrenWithProps && typeof children === 'function'
                                ? children(methods)
                                : children) as ReactNode
                        }
                    </BootstrapForm>
                </>
            )}
        </FormProvider>
    )
}

export {Form, UseFormReturn, FieldErrors}
