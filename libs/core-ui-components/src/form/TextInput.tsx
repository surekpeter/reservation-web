import { useFormContext, FieldError, RegisterOptions } from 'react-hook-form'
import { Form as BootstrapForm } from 'react-bootstrap'
import get from 'lodash/get'
import { ErrorFeedback } from './InputErrorFeedback'

export interface TextInputProps {
  as?: 'input' | 'textarea'
  type?: string
  name: string
  label?: string | JSX.Element
  placeholder?: string
  className?: string
  options?: RegisterOptions
  disableAutofill?: boolean
  readOnly?: boolean
  defaultValue?: string
}

export const TextArea = (props: TextInputProps) => <TextInput {...props} as='textarea' />

export const TextInput = ({
  type = 'text',
  as,
  label,
  name,
  placeholder,
  options = {},
  className,
  disableAutofill = true,
  readOnly,
  defaultValue,
}: TextInputProps) => {
  const {
    formState: { errors, isSubmitting, isValidating },
    register,
  } = useFormContext()
  const error = get(errors, name)
  const isErr = !!error?.type

  return (
    <BootstrapForm.Group
      controlId={`control-id-${name}`}
      className={`form-control-group ${className || ''}`}
    >
      {label && <BootstrapForm.Label>{label}</BootstrapForm.Label>}
      <BootstrapForm.Control
        {...register(name, options)}
        as={as}
        autoComplete={disableAutofill ? 'new-password' : undefined}
        data-1p-ignore={disableAutofill ? 'true' : undefined}
        data-lpignore={disableAutofill ? 'true' : undefined}
        type={type}
        defaultValue={defaultValue}
        aria-invalid={isErr ? 'true' : 'false'}
        isInvalid={isErr}
        placeholder={placeholder}
        disabled={isSubmitting || isValidating || options?.disabled || false}
        readOnly={readOnly}
      />
      {isErr && <ErrorFeedback error={error as FieldError} />}
    </BootstrapForm.Group>
  )
}
