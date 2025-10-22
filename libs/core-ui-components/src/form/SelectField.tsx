// external
import { Form as BootstrapForm } from 'react-bootstrap'
import { Controller, FieldError, ControllerProps } from 'react-hook-form'

// internal
import { Select, SelectVariant, OptionsType, SelectProps } from '../select'
import { ErrorFeedback } from './InputErrorFeedback'

export type SelectFieldProps = {
  name: ControllerProps['name']
  options: OptionsType
  required?: boolean
  disabled?: boolean
  label?: string
  className?: string
  loading?: boolean
  defaultValue?: unknown
} & Omit<SelectProps, 'variant' | 'inputId' | 'value' | 'onChange' | 'onBlur'>

export const SelectField = ({
  name,
  required = false,
  disabled = false,
  loading = false,
  options,
  label,
  className,
  ...props
}: SelectFieldProps) => {
  return (
    <Controller
      name={name}
      rules={{ required }}
      defaultValue={props.defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
        const isErr = !!error?.type
        return (
          <BootstrapForm.Group controlId={name} className={`form-control-group ${className || ''}`}>
            {label && <BootstrapForm.Label>{label}</BootstrapForm.Label>}
            <Select
              inputId={name}
              variant={SelectVariant.PRIMARY}
              className={isErr ? 'is-invalid' : ''}
              value={value}
              isLoading={loading}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
              isDisabled={disabled}
              {...props}
            />
            {isErr && <ErrorFeedback error={error as FieldError} />}
          </BootstrapForm.Group>
        )
      }}
    />
  )
}
