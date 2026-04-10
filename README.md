# create-latest-mern-app

[![npm version](https://img.shields.io/npm/v/create-latest-mern-app?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/create-latest-mern-app)
[![license](https://img.shields.io/npm/l/create-latest-mern-app?style=for-the-badge)](https://github.com/pulkitgarg04/create-latest-mern-app/blob/main/LICENSE)
[![node support](https://img.shields.io/badge/node-%3E%3D18-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
![total downloads](https://img.shields.io/badge/total%20downloads-500+-blue?style=for-the-badge&logo=npm)

Create a modern MERN app in under a minute.

A CLI to scaffold modern MERN projects quickly, with JavaScript or TypeScript templates for both frontend and backend.

## Why This Over Others?
- Focused: purpose-built for MERN, no extra framework noise.
- Flexible: choose frontend only, backend only, or full stack.
- JavaScript and TypeScript support for both client and server.
- Clean output: generates only what you select (`/client`, `/server`).
- Fast setup: ready-to-run templates with auth, product routes, and UI pages.

## Features
- Interactive setup flow for frontend and backend.
- React frontend templates (`react`, `react-ts`).
- Express backend templates (`server`, `server-ts`).
- Creates clean `/client` and `/server` folders based on your selections.

## Quick Start

```bash
npx create-latest-mern-app <your-app-name>
```

## Prompt Flow
When you run the CLI, it asks:
1. Project name
2. Do you want frontend?
3. Do you want backend?
4. Frontend language (if frontend selected)
5. Backend language (if backend selected)

If both frontend and backend are not selected, the CLI exits safely with a friendly message and creates nothing.

## Run the Generated App

```bash
cd <your-app-name>
```

If frontend was selected:

```bash
cd client
npm install
npm run dev
```

If backend was selected:

```bash
cd server
npm install
npm run dev
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines, setup steps, and PR expectations.

## Author
Made with ❤️ by [Pulkit Garg](https://github.com/pulkitgarg04)
