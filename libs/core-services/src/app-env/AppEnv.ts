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

// const GOOGLE_CLIENT_ID =
//   framework === 'vite'
//     ? import.meta.env.VITE_GOOGLE_CLIENT_ID
//     : framework === 'next'
//       ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
//       : null

export default { }
