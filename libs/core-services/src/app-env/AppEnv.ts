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


const KEYCLOAK_URL =
    framework === 'vite'
        ? import.meta.env.VITE_KEYCLOAK_URL
        : framework === 'next'
            ? process.env.NEXT_PUBLIC_KEYCLOAK_URL
            : null

const AppEnv = {KEYCLOAK_URL}

export { AppEnv }
