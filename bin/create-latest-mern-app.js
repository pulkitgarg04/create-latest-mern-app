#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import prompts from "prompts";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copyDir = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

const log = {
  success: (msg) => console.log(chalk.green.bold(`✔ ${msg}`)),
  error: (msg) => console.log(chalk.red.bold(`✖ ${msg}`)),
  info: (msg) => console.log(chalk.blue(`${msg}`)),
  step: (msg) => console.log(chalk.cyan(`→ ${msg}`)),
  warn: (msg) => console.log(chalk.yellow(`⚠ ${msg}`)),
};

const isValidProjectName = (name) => /^[a-zA-Z0-9._-]+$/.test(name);

const onCancel = () => {
  log.warn("Operation cancelled. Exiting.");
  process.exit(0);
};

const showBanner = () => {
  console.log();
  console.log(
    chalk.cyan.bold(
      "   ╔══════════════════════════════════════════════╗"
    )
  );
  console.log(
    chalk.cyan.bold(
      "   ║                                              ║"
    )
  );
  console.log(
    chalk.cyan.bold("   ║") +
    chalk.white.bold("         create-latest-mern-app ") +
    chalk.gray("v3.0") +
    chalk.cyan.bold("          ║")
  );
  console.log(
    chalk.cyan.bold("   ║") +
    chalk.gray("        Create a modern MERN app fast         ") +
    chalk.cyan.bold("║")
  );
  console.log(
    chalk.cyan.bold(
      "   ║                                              ║"
    )
  );
  console.log(
    chalk.cyan.bold(
      "   ╚══════════════════════════════════════════════╝"
    )
  );
  console.log();
};

async function run() {
  showBanner();

  const templatesDir = path.join(__dirname, "../templates");
  let projectName = process.argv[2];

  if (!projectName) {
    const res = await prompts(
      {
        type: "text",
        name: "projectName",
        message: "Project name:",
        initial: "my-mern-app",
        validate: (value) =>
          isValidProjectName(value)
            ? true
            : "Invalid name. Use only letters, numbers, hyphens, dots, or underscores.",
      },
      { onCancel }
    );
    projectName = res.projectName;
  } else if (!isValidProjectName(projectName)) {
    log.error(
      `Invalid project name "${projectName}". Use only letters, numbers, hyphens, dots, or underscores.`
    );
    process.exit(1);
  }

  const projectDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    const { overwrite } = await prompts(
      {
        type: "confirm",
        name: "overwrite",
        message: `Directory "${projectName}" already exists. Overwrite?`,
        initial: false,
      },
      { onCancel }
    );

    if (!overwrite) {
      log.info("Aborted. No files were changed.");
      process.exit(0);
    }
  }

  const { includeFrontend } = await prompts(
    {
      type: "confirm",
      name: "includeFrontend",
      message: "Do you want to scaffold frontend (React)?",
      initial: true,
    },
    { onCancel }
  );

  const { includeBackend } = await prompts(
    {
      type: "confirm",
      name: "includeBackend",
      message: includeFrontend
        ? "Do you also want backend (Express + MongoDB)?"
        : "Do you want to scaffold backend (Express + MongoDB)?",
      initial: true,
    },
    { onCancel }
  );

  if (!includeFrontend && !includeBackend) {
    log.info("Thanks for using create-latest-mern-app. You installed nothing :)");
    process.exit(0);
  }

  let frontendTemplate = null;
  let backendTemplate = null;

  if (includeFrontend) {
    const { lang } = await prompts(
      {
        type: "select",
        name: "lang",
        message: "Frontend language:",
        choices: [
          { title: "JavaScript", value: "react" },
          { title: "TypeScript", value: "react-ts" },
        ],
      },
      { onCancel }
    );
    frontendTemplate = lang;
  }

  if (includeBackend) {
    const { lang } = await prompts(
      {
        type: "select",
        name: "lang",
        message: "Backend language:",
        choices: [
          { title: "JavaScript", value: "server" },
          { title: "TypeScript", value: "server-ts" },
        ],
      },
      { onCancel }
    );
    backendTemplate = lang;
  }

  console.log();
  console.log(chalk.white.bold("Project Summary"));
  console.log(chalk.gray("─────────────────────────────────────"));
  console.log(`  ${chalk.gray("Name:")}      ${chalk.white.bold(projectName)}`);
  if (includeFrontend) {
    console.log(
      `  ${chalk.gray("Frontend:")}  ${chalk.white.bold(
        frontendTemplate === "react-ts" ? "React + TypeScript" : "React + JavaScript"
      )}`
    );
  }
  if (includeBackend) {
    console.log(
      `  ${chalk.gray("Backend:")}   ${chalk.white.bold(
        backendTemplate === "server-ts"
          ? "Express + TypeScript"
          : "Express + JavaScript"
      )}`
    );
  }
  console.log(chalk.gray("─────────────────────────────────────"));
  console.log();

  const { confirm } = await prompts(
    {
      type: "confirm",
      name: "confirm",
      message: "Proceed with scaffolding?",
      initial: true,
    },
    { onCancel }
  );

  if (!confirm) {
    log.info("Aborted. No files were changed.");
    process.exit(0);
  }

  console.log();
  fs.mkdirSync(projectDir, { recursive: true });

  if (includeFrontend) {
    const srcDir = path.join(templatesDir, frontendTemplate);
    if (!fs.existsSync(srcDir)) {
      log.error(`Frontend template "${frontendTemplate}" not found.`);
      process.exit(1);
    }
    log.step("Creating frontend...");
    copyDir(srcDir, path.join(projectDir, "client"));
    log.success("Frontend created.");
  }

  if (includeBackend) {
    const srcDir = path.join(templatesDir, backendTemplate);
    if (!fs.existsSync(srcDir)) {
      log.error(`Backend template "${backendTemplate}" not found.`);
      process.exit(1);
    }
    log.step("Creating backend...");
    copyDir(srcDir, path.join(projectDir, "server"));
    log.success("Backend created.");
  }

  console.log();
  console.log(chalk.white.bold("Next Steps"));
  console.log(chalk.gray("─────────────────────────────────────"));

  let step = 1;
  console.log(`  ${chalk.gray(`${step}.`)} ${chalk.cyan(`cd ${projectName}`)}`);
  step++;

  if (includeFrontend) {
    console.log(
      `  ${chalk.gray(`${step}.`)} ${chalk.cyan("cd client && npm install && npm run dev")}`
    );
    step++;
  }

  if (includeBackend) {
    console.log(
      `  ${chalk.gray(`${step}.`)} ${chalk.cyan("cd server && npm install && npm run dev")}`
    );
    step++;

    console.log();
    log.info(
      `Don't forget to create a ${chalk.yellow(".env")} file inside ${chalk.yellow(
        "server/"
      )} with your MongoDB URI and JWT secret.`
    );
  }

  console.log();
  log.success("Setup complete. Happy coding!\n");
}

run().catch((err) => {
  log.error(`Unexpected error: ${err.message}`);
  process.exit(1);
});