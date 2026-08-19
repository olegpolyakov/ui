import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy as copy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        copy({
            targets: [
                {
                    src: 'src/images',
                    dest: '.'
                },
                {
                    src: 'src/styles',
                    dest: '.'
                }
            ]
        })
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'OPUI',
            fileName: 'index',
            cssFileName: 'index'
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    },
    css: {
        modules: {
            scopeBehaviour: 'local',
            localsConvention: 'dashes',
            generateScopedName: (name, filename) => {
                const file = path.basename(filename, '.module.scss');
            
                if (file === 'classes') {
                    return `ui-${name}`;
                } else if (name === 'root') {
                    return `ui-${file}`;
                } else {
                    return `ui-${file}-${name}`;
                }
            }
        },
        preprocessorOptions: {
            scss: {
                loadPaths: [path.resolve(__dirname, 'src/styles')],
                silenceDeprecations: [
                    'if-function'
                ]
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});
