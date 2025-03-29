import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'url';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
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
            '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
            '@styles' : '/src/assets/styles',
            '@components' : '/src/components',
            '@hooks' : '/src/hooks',    
            '@store' : '/src/store',
            '@services' : '/src/services',
            '@pages' : '/src/pages',
        }
    }
});