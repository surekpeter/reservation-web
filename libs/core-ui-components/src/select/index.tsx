import ReactSelect, {
  Props as ReactSelectProps,
  ContainerProps,
  CSSObjectWithLabel,
  GroupBase,
} from 'react-select'

export enum SelectVariant {
  PRIMARY = 'primary',
  CHANGE_LANGUAGE = 'change-language',
  MODAL = 'modal',
  USER_SETTINGS = 'user-settings',
}

type OptionType = { [key: string]: any }
export type OptionsType = Array<OptionType>

export interface SelectProps extends Omit<ReactSelectProps, 'options'> {
  variant: SelectVariant
  options?: OptionsType
  username?: string
}

export const Select = ({ variant, options, ...props }: SelectProps) => {
  switch (variant) {
    case SelectVariant.PRIMARY: {
      const { className, ...rest } = props
      return (
        <ReactSelect
          unstyled
          className={`react-select-primary-variant ${className ?? ''}`}
          classNamePrefix='react-select'
          styles={{
            container: (
              base: CSSObjectWithLabel,
              props: ContainerProps<unknown, boolean, GroupBase<unknown>>,
            ) => {
              return {
                ...base,
                cursor: 'pointer',
                borderBottomLeftRadius: props.selectProps.menuIsOpen ? '0 !important' : '0.5rem',
                borderBottomRightRadius: props.selectProps.menuIsOpen ? '0 !important' : '0.5rem',
              } as CSSObjectWithLabel
            },
          }}
          defaultValue={options?.find((o: OptionType) => !!o?.default)}
          isClearable={false}
          isSearchable={false}
          options={options}
          {...rest}
        />
      )
    }
    case SelectVariant.CHANGE_LANGUAGE:
      return (
        <ReactSelect
          styles={{
            container: (
              base: CSSObjectWithLabel,
              props: ContainerProps<unknown, boolean, GroupBase<unknown>>,
            ) => {
              return {
                ...base,
                borderBottomLeftRadius: props.selectProps.menuIsOpen ? '0 !important' : '0.5rem',
                borderBottomRightRadius: props.selectProps.menuIsOpen ? '0 !important' : '0.5rem',
              } as CSSObjectWithLabel
            },
          }}
          classNames={{
            valueContainer: () => 'p-3',
            indicatorSeparator: () => 'd-none',
            indicatorsContainer: () => 'pe-3 fs-md',
            control: () => 'rounded',
          }}
          defaultValue={options?.find((o: OptionType) => o?.default)}
          isClearable={false}
          isSearchable={false}
          options={options}
          {...props}
        />
      )
    case SelectVariant.MODAL:
      return (
        <ReactSelect
          isDisabled={options?.length === 1}
          classNames={{
            control: () => 'p-3',
          }}
          defaultValue={options?.find((o: OptionType) => o?.default)}
          isClearable={false}
          isSearchable={false}
          options={options}
          {...props}
        />
      )
    case SelectVariant.USER_SETTINGS:
      return (
        <ReactSelect
          classNamePrefix='user-settings-menu'
          placeholder={props.username}
          value={props.username}
          options={options}
          isSearchable={false}
          closeMenuOnSelect={true}
          closeMenuOnScroll={true}
          inputId='header-navigation-desktop__open-user-menu'
          styles={{
            valueContainer: () => {
              return { display: 'flex', cursor: 'pointer' }
            },
            control: () => ({}),
          }}
          components={{
            DropdownIndicator: null,
            IndicatorSeparator: null,
          }}
          menuPortalTarget={window.document.documentElement.querySelector('#root') as HTMLElement}
          {...props}
        />
      )
    default:
      return <ReactSelect options={options} {...props} />
  }
}
