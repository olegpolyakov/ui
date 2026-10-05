import typeScriptPlugin from '@typescript-eslint/eslint-plugin';
import typeScriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const common = {
    plugins: {
        'react': reactPlugin,
        'react-hooks': reactHooksPlugin 
    },
    rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules,
        'arrow-parens': ['warn', 'as-needed'],
        'comma-dangle': ['warn', 'never'],
        'indent': ['error', 4, {
            'SwitchCase': 1,
            'MemberExpression': 1
        }],
        'jsx-quotes': ['warn', 'prefer-double'],
        'object-curly-spacing': ['warn', 'always'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        'react-hooks/refs': 'warn',
        'react-hooks/set-state-in-effect': 'warn'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};

export default [
    {
        files: ['**/*.js', '**/*.jsx'],
        plugins: {
            ...common.plugins
        },
        rules: {
            ...common.rules
        },
        settings: {
            ...common.settings
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typeScriptParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            '@typescript-eslint': typeScriptPlugin,
            ...common.plugins
        },
        rules: {
            ...typeScriptPlugin.configs.recommended.rules,
            ...common.rules,
            '@typescript-eslint/no-unused-vars': 'warn'
        },
        settings: {
            ...common.settings
        }
    },
    {
        files: ['./docs/**/*.ts', './docs/**/*.tsx'],
        languageOptions: {
            parser: typeScriptParser,
            parserOptions: {
                project: './docs/tsconfig.json',
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            '@typescript-eslint': typeScriptPlugin,
            ...common.plugins
        },
        rules: {
            ...typeScriptPlugin.configs.recommended.rules,
            ...common.rules
        },
        settings: {
            ...common.settings
        }
    }
];