const detectFramework = () => {
  if (import.meta.env?.MODE) {
    return 'vite'
  }
  if (typeof window !== 'undefined' && window?.next?.version) {
    return 'next'
  }

  return 'unknown'
}

const framework = detectFramework()

const FOO =
  framework === 'vite'
    ? import.meta.env.VITE_FOO
    : framework === 'next'
      ? process.env.NEXT_PUBLIC_FOO
      : null

export default {  }
