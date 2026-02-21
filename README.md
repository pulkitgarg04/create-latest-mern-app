# create-latest-mern-app

A CLI to scaffold modern MERN projects quickly, with JavaScript or TypeScript templates for both frontend and backend.

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

## Author
Made with ❤️ by [Pulkit Garg](https://github.com/pulkitgarg04)