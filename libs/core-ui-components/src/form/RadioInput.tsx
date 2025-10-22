import { Form as BootstrapForm, FormCheckProps } from 'react-bootstrap'
import { useFormContext, RegisterOptions } from 'react-hook-form'
import get from 'lodash/get'

interface Props extends FormCheckProps {
  name: string
  value: any
  options?: RegisterOptions
}

export const RadioInput = ({ label, name, value, options, ...props }: Props) => {
  const { register, formState } = useFormContext()
  return (
    <BootstrapForm.Check
      type='radio'
      {...register(name, options)}
      isInvalid={!!get(formState, `errors.${name}`, false)}
      id={`id-${name}-${value}`}
      name={name}
      value={value?.toString()}
      inline
      label={label}
      {...props}
    />
  )
}
