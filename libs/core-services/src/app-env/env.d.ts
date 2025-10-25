interface ImportMetaEnv {
  readonly MODE: 'development' | 'production'
  readonly VITE_GOOGLE_CLIENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
