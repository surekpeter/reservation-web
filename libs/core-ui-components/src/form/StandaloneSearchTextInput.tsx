import { forwardRef, ChangeEvent, useImperativeHandle, useRef } from 'react'
import { Form as BootstrapForm } from 'react-bootstrap'
import { BiSearch } from '@react-icons/all-files/bi/BiSearch'

export interface StandaloneSearchTextInputProps {
  name?: string
  placeholder?: string
  className?: string
  value?: string
  onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void
}

export const StandaloneSearchTextInput = forwardRef<
  HTMLInputElement | null,
  StandaloneSearchTextInputProps
>(
  (
    { name = 'q', value, placeholder, className, onChange }: StandaloneSearchTextInputProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          inputRef.current?.focus()
        },
        blur: () => {
          inputRef.current?.blur()
        },
      } as HTMLInputElement
    })
    return (
      <BootstrapForm.Group
        controlId={`control-id-${name}`}
        className={`form-control-group search-input-container ${className || ''}`}
      >
        <BootstrapForm.Control
          type='search'
          name={name}
          ref={inputRef}
          placeholder={placeholder}
          value={value || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value, e)
          }}
        />
        <BiSearch className='search-icon' size={24} />
      </BootstrapForm.Group>
    )
  },
)

StandaloneSearchTextInput.displayName = 'StandaloneSearchTextInput'
