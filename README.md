# Kopalet - React App

A React application built with TypeScript and Vite.

## Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Vercel
3. Set the environment variable `VITE_API_BASE_URL` in Vercel's dashboard to your API's base URL
4. Deploy

The app is configured with `vercel.json` for proper build settings.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
