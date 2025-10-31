interface ImportMetaEnv {
  readonly MODE: 'development' | 'production'
  readonly VITE_KEYCLOAK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
