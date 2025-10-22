export function getImageSrc(img: string | { src: string }): string {
  return typeof img === 'string' ? img : img.src
}
