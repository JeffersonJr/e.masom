import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Helper to polyfill Express/Vercel style response properties
function polyfillResponse(res: any) {
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    return res;
  };
}

// Custom Vite plugin to handle Vercel Serverless Functions locally
const vercelApiPlugin = () => ({
  name: 'vercel-api',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url && req.url.startsWith('/api/')) {
        polyfillResponse(res);

        // Parse JSON body if it's POST/PUT/PATCH
        if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const data = Buffer.concat(buffers).toString();
          try {
            req.body = JSON.parse(data);
          } catch (e) {
            req.body = {};
          }
        }

        // Parse query params and set req.query
        const urlObj = new URL(req.url, 'http://localhost');
        const query: Record<string, string> = {};
        urlObj.searchParams.forEach((value, key) => {
          query[key] = value;
        });
        req.query = query;

        // Map URL to API file path (e.g. /api/auth/login -> api/auth/login.ts)
        const pathname = urlObj.pathname;
        const potentialFiles = [
          path.join(process.cwd(), pathname + '.ts'),
          path.join(process.cwd(), pathname + '.js'),
          path.join(process.cwd(), pathname, 'index.ts'),
          path.join(process.cwd(), pathname, 'index.js'),
        ];

        let apiFile = null;
        for (const file of potentialFiles) {
          if (fs.existsSync(file)) {
            apiFile = file;
            break;
          }
        }

        if (apiFile) {
          try {
            // Compile and load the TS/JS module on the fly with Vite SSR
            const module = await server.ssrLoadModule(apiFile);
            const handler = module.default;
            if (typeof handler === 'function') {
              await handler(req, res);
            } else {
              res.status(500).json({ error: 'API route does not export a default handler function' });
            }
          } catch (err: any) {
            console.error('Error in local API handler:', err);
            res.status(500).json({ error: err.message || 'Internal Server Error' });
          }
        } else {
          res.status(404).json({ error: `API route ${pathname} not found` });
        }
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: { include: ['xlsx'] },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
          }
        }
      }
    }
  }
})
