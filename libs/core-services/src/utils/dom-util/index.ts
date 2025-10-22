/**
 * @description Check if the current environment is a browser
 * @returns boolean
 */
export const canUseDOM = () =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement)

/**
 *
 * @description Check if the passed in value is a DOM element
 * @returns boolean
 */
const isDOMElement = (possibleElement: unknown, type?: any): possibleElement is Element =>
  possibleElement instanceof (type || Element)

/**
 * @description Select an element from the DOM
 * @param selector The selector to use to select the element
 * @param parent The parent element to select from
 */
export const selectFirstElement = (selector: string, parent?: HTMLElement) => {
  if (canUseDOM()) {
    return isDOMElement(parent)
      ? parent.querySelector(selector)
      : window.document.documentElement.querySelector(selector)
  }
  return null
}

/**
 *
 * @description toogle checkbox checked status
 */
const toogleCheckboxChecked = (checkbox: HTMLInputElement) => {
  if (isDOMElement(checkbox, HTMLInputElement)) {
    checkbox.checked = !checkbox.checked
  }
}

/**
 *
 * @description toogle checkbox checked status by selector
 */
export const toogleCheckboxCheckedBySelector = (selector: string, parent?: HTMLElement) => {
  toogleCheckboxChecked(selectFirstElement(selector, parent) as HTMLInputElement)
}

/**
 *
 *
 * @description clear the browser state by replacing the current state with an empty object
 */
export const clearBrowserState = () => {
  if (canUseDOM()) {
    window.history.replaceState({}, '')
  }
}

/**
 *
 * @description Check if the current environment is a browser
 * @returns boolean
 */
export const isTargetOrHasTargetButtonElement = (e: React.MouseEvent) => {
  if (!canUseDOM()) {
    return false
  }
  return (
    e.target instanceof HTMLButtonElement ||
    ((e.target as HTMLElement).hasChildNodes() &&
      Array.from((e.target as HTMLElement).children).some(
        (child) => child instanceof HTMLButtonElement,
      ))
  )
}
