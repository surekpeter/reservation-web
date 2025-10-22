interface ImportMetaEnv {
  readonly MODE: 'development' | 'production'
  readonly VITE_FOO?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
