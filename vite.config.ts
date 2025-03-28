import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    build: {
        outDir: 'dist',
        assetsDir: 'assets', // Ensures JS files are correctly placed
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash][extname]',
            },
        },
    },
    resolve: {
        alias: {
            '@' : '/src',
            '@styles' : '/src/assets/styles',
        }
    }
});