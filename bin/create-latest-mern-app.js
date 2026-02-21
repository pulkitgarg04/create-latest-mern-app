#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import prompts from "prompts";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createDir = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src, { withFileTypes: true }).forEach((entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    entry.isDirectory()
      ? createDir(srcPath, destPath)
      : fs.copyFileSync(srcPath, destPath);
  });
};

const success = (message) => console.log(chalk.green.bold(`✔ ${message}`));
const error = (message) => console.log(chalk.red.bold(`✖ ${message}`));
const info = (message) => console.log(chalk.blue.bold(`ℹ ${message}`));

async function run() {
  const templatesDir = path.join(__dirname, "../templates");

  const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: "What would you like to name your project?",
    initial: "my-app",
  });

  if (!projectName) {
    error("No project name provided. Exiting.");
    process.exit(1);
  }

  const projectDir = path.resolve(process.cwd(), projectName);
  fs.mkdirSync(projectDir, { recursive: true });

  const { includeFrontend } = await prompts({
    type: "confirm",
    name: "includeFrontend",
    message: "Do you want to include a frontend (React)?",
    initial: true,
  });

  if (includeFrontend) {
    const { frontendLang } = await prompts({
      type: "select",
      name: "frontendLang",
      message: "Choose language for frontend:",
      choices: [
        { title: "JavaScript", value: "react" },
        { title: "TypeScript", value: "react-ts" },
      ],
    });

    const frontendSrcDir = path.join(templatesDir, frontendLang);
    const frontendDestDir = path.join(projectDir, "client");

    if (!fs.existsSync(frontendSrcDir)) {
      error(`Frontend template not found for ${frontendLang}`);
      process.exit(1);
    }

    info("Creating frontend...");
    createDir(frontendSrcDir, frontendDestDir);
    success("Frontend created.");
  }

  const { includeBackend } = await prompts({
    type: "confirm",
    name: "includeBackend",
    message: "Do you want to include a backend (Express)?",
    initial: true,
  });

  if (includeBackend) {
    const { backendLang } = await prompts({
      type: "select",
      name: "backendLang",
      message: "Choose language for backend:",
      choices: [
        { title: "JavaScript", value: "server" },
        { title: "TypeScript", value: "server-ts" },
      ],
    });

    const backendSrcDir = path.join(templatesDir, backendLang);
    const backendDestDir = path.join(projectDir, "server");

    if (!fs.existsSync(backendSrcDir)) {
      error(`Backend template not found for ${backendLang}`);
      process.exit(1);
    }

    info("Creating backend...");
    createDir(backendSrcDir, backendDestDir);
    success("Backend created.");
  }

  info(`\nProject created at ${chalk.cyan(projectDir)}`);
  console.log(chalk.yellow.bold("\nNext Steps:"));
  console.log(`  1. Navigate: ${chalk.cyan(`cd ${projectName}`)}`);
  if (includeFrontend) {
    console.log(`  2. Frontend: ${chalk.cyan(`cd client && npm install && npm run dev`)}`);
  }
  if (includeBackend) {
    console.log(`  3. Backend: ${chalk.cyan(`cd server && npm install && npm run dev`)}`);
  }
  success("\nSetup complete. Happy coding!");
}

run().catch((err) => {
  error(`Unexpected error: ${err.message}`);
  process.exit(1);
});