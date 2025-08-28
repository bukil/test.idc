# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    # Simple Quiz (React + Vite + TypeScript)

    This is a simple multiple-choice quiz website built with React, Vite, and TypeScript. It uses Material UI for styling and React Router for navigation. The site is configured to deploy automatically to GitHub Pages.

    ## Scripts

    - dev: Start local dev server
    - build: Type-check and build for production
    - preview: Preview the production build locally

    ## Local development

    1. Install dependencies
    2. Run the dev server

    ## Deployment

    This repo includes a GitHub Actions workflow that builds and deploys the site to GitHub Pages on every push to `main`.

    If this repo is a project site (https://<user>.github.io/<repo>/), the Vite base is set to `/test.idc/`. If you rename the repo, update `vite.config.ts` accordingly.
])
