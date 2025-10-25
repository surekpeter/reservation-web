import { Controller, useFormContext } from 'react-hook-form'
import { Form as BootstrapForm, FormCheckProps } from 'react-bootstrap'

interface CheckboxInputProps extends FormCheckProps {
  name: string
  required?: boolean
  disabled?: boolean
}

export const CheckboxInput = ({
  label,
  name,
  disabled = false,
}: CheckboxInputProps) => {
  const { control, formState } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <BootstrapForm.Check
          id={`checkbox-${name}`}
          label={label}
          type='checkbox'
          checked={!!field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          disabled={formState.isSubmitting || disabled}
        />
      )}
    />
  )
}
