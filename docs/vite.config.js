import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import { parse } from 'react-docgen-typescript';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/ui/' : '/',
    root: path.resolve(__dirname, 'src'),
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [
        mdx({
            providerImportSource: '@/mdx-components'
        }),
        react(),
        docgen(),
        svgr()
    ],
    css: {
        modules: {
            scopeBehaviour: 'local',
            localsConvention: 'dashes',
            generateScopedName: (name, filename) => {
                const file = path.basename(filename, '.module.scss');

                if (filename.includes('/docs/src/')) {
                    return `${file}-${name}`;
                }

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
                loadPaths: [path.resolve(__dirname, '../src/styles')]
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, '../src')
        }
    },
    server: {
        open: true
    }
}));

function docgen() {
    const options = {
        savePropValueAsString: false,
        shouldExtractValuesFromUnion: true,
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: prop => {
            if (prop.declarations !== undefined && prop.declarations.length > 0) {
                const hasPropAdditionalDescription = prop.declarations.find(declaration => {
                    return !declaration.fileName.includes('node_modules');
                });

                return Boolean(hasPropAdditionalDescription);
            }

            return true;
        }
    };

    return {
        name: 'docgen',
        transform(code, id) {
            if (
                id.includes('node_modules') ||
                !id.endsWith('.tsx') ||
                !id.includes('/ui/src/components/')
            ) {
                return null;
            }

            const data = parse(id, options)[0];

            return {
                code: `${code}\n\n${data.displayName}.settings = ${JSON.stringify(data.props)}`
            };
        }
    };
}