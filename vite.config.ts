import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
    ],
    esbuild: {
        loader: 'tsx',
        include: /\.tsx?$/,
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
                '.ts': 'tsx',
            },
        },
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
        }
    }
});