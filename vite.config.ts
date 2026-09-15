import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function serveMuniRutasPlugin(): Plugin {
  return {
    name: 'serve-muni-rutas',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/rutas/') || req.url.startsWith('/muni-puno-mapa/rutas/'))) {
          const filename = path.basename(req.url.split('?')[0]);
          const localPath = path.resolve(__dirname, 'muni-puno-mapa/rutas', filename);
          if (fs.existsSync(localPath)) {
            res.setHeader('Content-Type', 'application/json');
            return fs.createReadStream(localPath).pipe(res);
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [serveMuniRutasPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
