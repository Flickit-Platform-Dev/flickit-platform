/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KEYCLOACK_URL: string;
  readonly VITE_KEYCLOACK_REALM: string;
  readonly VITE_KEYCLOACK_CLIENT_ID: string;
  readonly VITE_APP_TITLE: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
