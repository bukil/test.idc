import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to https://<USER>.github.io/<REPO>/, set base to '/<REPO>/'
// For user/organization pages (https://<USER>.github.io), set base to '/'
export default defineConfig({
  plugins: [react()],
  base: '/test.idc/',
})
