#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import prompts from "prompts";
import chalk from "chalk";
import { execa } from "execa";

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
    initial: "my-project",
  });

  if (!projectName) {
    error("No project name provided. Exiting.");
    process.exit(1);
  }

  const { projectType } = await prompts({
    type: "select",
    name: "projectType",
    message: "Select the project type:",
    choices: [
      { title: "Next.js App (TypeScript)", value: "next-app" },
      { title: "Next.js App (JavaScript)", value: "next-app-js" },
      { title: "React App (JavaScript)", value: "react-app" },
      { title: "React App (TypeScript)", value: "react-ts-app" },
    ],
  });

  if (!projectType) {
    error("No project type selected. Exiting.");
    process.exit(1);
  }

  let destDir = path.resolve(process.cwd(), projectName);
  let srcDir = path.join(templatesDir, projectType);

  if (projectType === "react-app" || projectType === "react-ts-app") {
    destDir = path.join(destDir, "client");
  }

  if (!fs.existsSync(srcDir)) {
    error(`Template for ${projectType} not found at ${srcDir}`);
    process.exit(1);
  }

  if (projectType === "react-app" || projectType === "react-ts-app") {
    const { installTailwind } = await prompts({
      type: "confirm",
      name: "installTailwind",
      message: "Do you want to install and configure Tailwind CSS?",
      initial: true,
    });

    if (installTailwind) {
      info("Installing and configuring Tailwind CSS...");
      try {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        await execa(
          "npm",
          ["install", "tailwindcss", "postcss", "autoprefixer", "--save-dev"],
          { cwd: destDir, stdio: "inherit" }
        );

        await execa("npx", ["tailwindcss", "init"], {
          cwd: destDir,
          stdio: "inherit",
        });

        const tailwindConfig = {
          content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
          theme: {
            extend: {},
          },
          plugins: [],
        };

        fs.writeFileSync(
          path.join(destDir, "tailwind.config.js"),
          `module.exports = ${JSON.stringify(tailwindConfig, null, 2)}\n`
        );

        const postcssConfig = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        };

        fs.writeFileSync(
          path.join(destDir, "postcss.config.js"),
          `module.exports = ${JSON.stringify(postcssConfig, null, 2)}\n`
        );

        const cssFilePath = path.join(destDir, "src", "index.css");
        if (!fs.existsSync(cssFilePath)) {
          fs.mkdirSync(path.join(destDir, "src"), { recursive: true });
          fs.writeFileSync(cssFilePath, "");
        }
        const tailwindImports = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
        fs.appendFileSync(cssFilePath, tailwindImports);

        success("Tailwind CSS installed and configured successfully.");
      } catch (err) {
        error(`Failed to install or configure Tailwind CSS: ${err.message}`);
        process.exit(1);
      }
    }

    const { includeServer } = await prompts({
      type: "confirm",
      name: "includeServer",
      message: "Do you want to include a server backend?",
      initial: false,
    });

    if (includeServer) {
      const { serverType } = await prompts({
        type: "select",
        name: "serverType",
        message: "Select the database for server type:",
        choices: [
          { title: "Mongoose (MongoDB)", value: "server-mongoose" },
          { title: "Prisma (SQL)", value: "server-prisma" },
        ],
      });

      if (serverType) {
        const serverSrcDir = path.join(templatesDir, serverType);
        const serverDestDir = path.join(destDir, "../server");

        if (fs.existsSync(serverSrcDir)) {
          info("Creating server files...");
          createDir(serverSrcDir, serverDestDir);
          success("Server files created successfully.");
        } else {
          error(`Template for ${serverType} not found.`);
          process.exit(1);
        }
      }
    }
  }

  info(`Creating ${projectType} project files at ${chalk.cyan(destDir)}...`);
  try {
    createDir(srcDir, destDir);
    success("Project files created successfully.");
  } catch (err) {
    error(`Failed to create project files: ${err.message}`);
    process.exit(1);
  }

  console.log(chalk.yellow.bold("\nNext Steps:"));
  console.log(
    `  1. Navigate to your project folder: ${chalk.cyan(`cd ${projectName}`)}`
  );
  console.log(`  2. Install dependencies: ${chalk.cyan("npm install")}`);
  console.log(
    `  3. Start your development server: ${chalk.cyan(
      "npm start"
    )} (or ${chalk.cyan("npm run dev")} for Next.js)`
  );

  success("Setup complete. Happy coding!");
}

run().catch((err) => {
  error(`Unexpected error: ${err.message}`);
  process.exit(1);
});