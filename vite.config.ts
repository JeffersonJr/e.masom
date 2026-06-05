import { defineConfig, ViteDevServer, Connect } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { ServerResponse } from 'http'

interface CustomRequest extends Connect.IncomingMessage {
  body?: unknown;
  query?: Record<string, string>;
}

interface PolyfilledResponse extends ServerResponse {
  status: (code: number) => PolyfilledResponse;
  json: (data: unknown) => PolyfilledResponse;
}

// Helper to polyfill Express/Vercel style response properties
function polyfillResponse(res: ServerResponse): PolyfilledResponse {
  const polyfilled = res as PolyfilledResponse;
  polyfilled.status = (code: number) => {
    polyfilled.statusCode = code;
    return polyfilled;
  };
  polyfilled.json = (data: unknown) => {
    polyfilled.setHeader('Content-Type', 'application/json');
    polyfilled.end(JSON.stringify(data));
    return polyfilled;
  };
  return polyfilled;
}

// Custom Vite plugin to handle Vercel Serverless Functions locally
const vercelApiPlugin = () => ({
  name: 'vercel-api',
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req: Connect.IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
      if (req.url && req.url.startsWith('/api/')) {
        const polyfilledRes = polyfillResponse(res);
        const customReq = req as CustomRequest;

        // Parse JSON body if it's POST/PUT/PATCH
        if (['POST', 'PUT', 'PATCH'].includes(customReq.method || '')) {
          const buffers: Uint8Array[] = [];
          for await (const chunk of customReq) {
            buffers.push(chunk as Uint8Array);
          }
          const data = Buffer.concat(buffers).toString();
          try {
            customReq.body = JSON.parse(data);
          } catch {
            customReq.body = {};
          }
        }

        // Parse query params and set req.query
        const urlObj = new URL(customReq.url || '', 'http://localhost');
        const query: Record<string, string> = {};
        urlObj.searchParams.forEach((value, key) => {
          query[key] = value;
        });
        customReq.query = query;

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
              await handler(customReq, polyfilledRes);
            } else {
              polyfilledRes.status(500).json({ error: 'API route does not export a default handler function' });
            }
          } catch (err) {
            const error = err as Error;
            console.error('Error in local API handler:', error);
            polyfilledRes.status(500).json({ error: error.message || 'Internal Server Error' });
          }
        } else {
          polyfilledRes.status(404).json({ error: `API route ${pathname} not found` });
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
