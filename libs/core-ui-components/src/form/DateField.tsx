// external
import React, { ChangeEventHandler, forwardRef, MouseEventHandler, useEffect, useRef } from 'react'
import { Controller, ControllerProps, FieldError, RegisterOptions } from 'react-hook-form'
import { Form as BootstrapForm } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import { BiCalendar } from '@react-icons/all-files/bi/BiCalendar'

// internal
import { ErrorFeedback } from './InputErrorFeedback'

import { enUS, hu, Locale } from 'date-fns/locale'
import { format as formatDateFns, isValid, parse } from 'date-fns'

const formatDateToBackend = (date: Date): string => {
  return date && !isNaN(date.getTime()) ? formatDateFns(date, 'yyyy-MM-dd') : ''
}

const applyInputToFormat = (digits: string, format: string): string => {
  let result = ''
  let digitIndex = 0

  for (const element of format) {
    const char = element
    if (/[dMy]/.test(char)) {
      result += digitIndex < digits.length ? digits[digitIndex] : ''
      digitIndex++
    } else {
      if (digitIndex > 0 && digitIndex <= digits.length) {
        result += char
      }
    }
  }

  return result
}

const formatDate = (input: string, dateFormat: string): string => {
  const rawDigits = input.replace(/\D/g, '')
  if (!rawDigits.length) return ''

  const maskedInput = applyInputToFormat(rawDigits, dateFormat)

  const expectedDigits = dateFormat.replace(/[^dMy]/g, '').length
  if (rawDigits.length < expectedDigits) {
    return maskedInput
  }

  const parsedDate = parse(maskedInput, dateFormat, new Date())
  if (!isValid(parsedDate)) {
    return maskedInput
  }

  return formatDateFns(parsedDate, dateFormat)
}

interface DateInputProps {
  isErr: boolean
  dateFormat: string
  placeholder?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string
  name?: string
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ isErr, placeholder, disabled, onClick, onChange, value, name, dateFormat, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (isErr) {
        inputRef.current?.scrollIntoView()
      }
    }, [isErr])
    return (
      <div ref={ref}>
        <BootstrapForm.Control
          readOnly
          ref={inputRef}
          type='text'
          onClick={onClick}
          name={name}
          value={formatDate(value ?? '', dateFormat)}
          aria-invalid={isErr ? 'true' : 'false'}
          isInvalid={isErr}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
        <BiCalendar
          className='calendar-icon'
          size={24}
          onClick={(e: React.MouseEvent<SVGSVGElement>) => {
            e.preventDefault()
            e.stopPropagation()
            const prev = (e.target as HTMLElement).previousElementSibling as HTMLElement | null
            prev?.focus()
          }}
        />
      </div>
    )
  },
)

DateInput.displayName = 'DateInput'

const defaultLang = 'en'

const localeMap: Record<string, Locale> = {
  en: enUS,
  hu: hu,
}

const dateFormatMap: Record<string, string> = {
  en: 'MM/dd/yyyy',
  hu: 'yyyy/MM/dd',
}

const localizedPlaceholderMap: Record<string, string> = {
  en: 'MM/DD/YYYY',
  hu: 'ÉÉÉÉ/HH/NN',
}

export const DateField = ({
  id,
  name,
  label = '',
  maxDate,
  minDate,
  placeholder,
  options = {},
  dateFormat,
  className,
}: {
  id?: string
  name: ControllerProps['name']
  maxDate?: Date
  minDate?: Date
  label?: string
  placeholder?: string
  options?: RegisterOptions
  className?: string
  dateFormat?: string | string[]
}) => {
  const htmlLang = document.documentElement.lang || defaultLang
  const formatValue = Array.isArray(dateFormat) ? dateFormat[0] : dateFormat
  const effectiveLocale = localeMap[htmlLang] || enUS
  const effectiveDateFormat = formatValue || dateFormatMap[htmlLang] || dateFormatMap[defaultLang]
  const effectivePlaceholder =
    placeholder || localizedPlaceholderMap[htmlLang] || localizedPlaceholderMap[defaultLang]

  return (
    <Controller
      name={name}
      rules={options}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: { isSubmitting, isValidating },
      }) => {
        const isErr = !!error?.type
        return (
          <BootstrapForm.Group
            className={`form-control-group date-picker-container ${className || ''}`}
          >
            {label && <BootstrapForm.Label>{label}</BootstrapForm.Label>}
            <ReactDatePicker
              id={id}
              showMonthDropdown={true}
              showYearDropdown
              maxDate={maxDate}
              minDate={minDate}
              scrollableYearDropdown
              showYearPicker={false}
              dropdownMode='select'
              yearDropdownItemNumber={120}
              wrapperClassName={isErr ? 'is-invalid' : ''}
              selected={value && new Date(value)}
              placeholderText={effectivePlaceholder}
              name={name}
              disabled={isSubmitting || isValidating || options?.disabled || false}
              onChangeRaw={(e) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const value = e.target.value
                if (value) {
                  const parsed = parse(value, effectiveDateFormat, new Date())

                  if (isValid(parsed) && value.length === effectiveDateFormat.length) {
                    const formattedDate = formatDateToBackend(parsed)
                    onChange(formattedDate)
                  }
                }
              }}
              onChange={(date: Date | null) => {
                if (date) {
                  const formattedDate = formatDateToBackend(date)
                  onChange(formattedDate)
                }
              }}
              customInput={<DateInput isErr={isErr} dateFormat={effectiveDateFormat} />}
              dateFormat={effectiveDateFormat}
              locale={effectiveLocale}
            />
            {isErr && <ErrorFeedback error={error as FieldError}/>}
          </BootstrapForm.Group>
        )
      }}
    />
  )
}
