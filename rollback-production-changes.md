# Rollback Prompt

Revert the deployment edits made for the kopalet production test setup. Restore these files to their previous contents:

- [/.env.example](./.env.example)
- [/src/api/axios.js](./src/api/axios.js)
- [/vite.config.js](./vite.config.js)
- [/.htaccess](./.htaccess)
- [/kplt/.env](./kplt/.env)
- [/kplt/.env.example](./kplt/.env.example)
- [/kplt/config/cors.php](./kplt/config/cors.php)
- [/kplt/.htaccess](./kplt/.htaccess)
- [/kplt/public/.htaccess](./kplt/public/.htaccess)
- [/rollback-production-changes.md](./rollback-production-changes.md)

The main changes to undo are the production API base URL, the commented Vite proxy config, the Laravel production env values, the Sanctum/CORS SPA cookie settings, and the Apache routing files.
