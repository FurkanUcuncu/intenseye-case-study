import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
        ...reactHooks.configs.recommended.rules, 
        'react-refresh/only-export-components': [
            'warn', 
            { allowConstantExport: true },
        ],
        "quotes": [
            2,
            "single",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "indent": [
            "error",
            4,
            {
                "ignoredNodes": [
                    "JSXElement"
                ],
                "SwitchCase": 1
            }
        ],
        "react/jsx-indent": [
            "error",
            4
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
    },
  },
)
