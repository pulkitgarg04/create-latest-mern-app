# create-latest-mern-app

A CLI tool to quickly scaffold a modern **MERN** (MongoDB, Express, React, Node.js) application with optional **TypeScript** support for both frontend and backend.

## Features
- Scaffold a full-stack MERN app in seconds.
- Choose **JavaScript** or **TypeScript** for both frontend and backend.
- Frontend built with **React**.
- Backend powered by **Express**.
- Simple, extendable template structure.
- Organized project structure with `/client` and `/server`.

## Installation
You can use the CLI tool directly with `npx` (no global install needed):

```bash
npx create-latest-mern-app
```

## Usage
1. Run the CLI:
```bash
npx create-latest-mern-app
```

2. Follow the prompts to:
- Name your project
- Choose frontend (React) with JS or TS
- Choose backend (Express) with JS or TS

3. Navigate to your project directory and start coding:
```bash
cd <your-project-name>
```

4. Install dependencies:

If you included a frontend:
```bash
cd client
npm install
npm start
```

If you included a backend:
```bash
cd server
npm install
npm start
```

## Author
Made with ❤️ by [Pulkit Garg](https://www.github.com/pulkitgarg04)