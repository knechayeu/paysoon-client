import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  console.log(mode, 11)

  const serverConfig = mode === 'development' ? {
    port: 5173,
    host: "0.0.0.0",
    hmr: {
      host: 'localhost',
      port: 5174,
    },
    https: mode === 'development' && fs.existsSync('./.cert/localhost-key.pem') ? {
      key: fs.readFileSync('./.cert/localhost-key.pem'),
      cert: fs.readFileSync('./.cert/localhost.pem'),
    } : undefined,
  } : {}

  return {
    plugins: [react()],
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, "_");
        prev[`process.env.${sanitizedKey}`] = JSON.stringify(env[key]);
        return prev;
      }, {}),
    },
    server: serverConfig,
  }
})