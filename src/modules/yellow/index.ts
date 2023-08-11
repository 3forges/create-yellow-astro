#!/usr/bin/env node

// Usage: npx create-my-template my-app
import Commander, { Command } from 'commander'
// const { Command } = require("commander"); // add this line
// import { Command, createCommand } from '@commander-js/extra-typings';
import figlet from 'figlet';
// const figlet = require("figlet");
// import * as path from "path";
import path from "path";
/**
 * pnpm add -D @types/cross-spawn && pnpm add cross-spawn
 */
import spawn from 'cross-spawn';
import fs from 'fs';
// const path = require('path');

/**
 * 
 * 
 * 
 * ---------------------------------------------------------
 * 
 * 
 * 
 * https://blog.logrocket.com/building-typescript-cli-node-js-commander/
 * 
 * 
 * 
 */

//const yellowCli = Commander.createCommand(`yellow`)
// const yellowCli = createCommand(`yellow`)

//add the following line
const yellowCli = new Command();

console.log(figlet.textSync("GO YELLOW!"));
yellowCli.version("1.0.0")
         .description("An example CLI for managing a directory")
         .option("-l, --ls  [value]", "List directory contents")
         .option("-m, --mkdir <value>", "Create a directory")
         .option("-t, --touch <value>", "Create a file")
         .parse(process.argv);

console.log(` [YELLOW_BERNARD] = [${process.env.YELLOW_BERNARD}]`)
console.log(` [process.argv] = [${JSON.stringify(process.argv)}]`)
for (let i: number = 2; i < process.argv.length; i++){
  console.log(` COIN COIN process.argv[${i}] = ${process.argv[i]}`);
}

const yellowOpts = yellowCli.opts();
console.log('YELLOW VCLI Options: ', JSON.stringify(yellowOpts));
console.log(`YELLOW VCLI yellowOpts.touch: [${yellowOpts.touch?yellowOpts.touch:'yellowOpts.touch is undefined'}]`);
console.log(`YELLOW VCLI yellowOpts.ls: [${yellowOpts.ls?yellowOpts.ls:'yellowOpts.ls is undefined'}]`);
console.log('Remaining arguments: ', yellowCli.args);



/**
 * 
 * 
 * 
 * ------------------1
 * 
 */

const getHasCli = (prefix: string, alias = undefined) => {
  const prefixIndex = process.argv.findIndex(
    (arg) => arg === prefix || (alias && arg === alias)
  );
  return prefixIndex > 0;
};

const getCliData = (prefix: string, alias = undefined) => {
  let data = undefined;
  const prefixIndex = process.argv.findIndex(
    (arg) => arg === prefix || (alias && arg === alias)
  );
  if (prefixIndex > 0) {
    const cliData = process.argv[prefixIndex + 1] ?? undefined;
    if (cliData) {
      data = cliData.includes("-") ? undefined : cliData;
    }
  }
  return data;
};

(async () => {
  console.log(`ASYNCV - getCliData("--dir") ${getCliData("--dir")}`);
  console.log(`ASYNCV - getCliData("--ls") ${getCliData("--ls")}`);
  console.log(`ASYNCV - getHasCli("--mkdir") ${getHasCli("--mkdir")}`);
  console.log(`ASYNCV - getHasCli("--touch") ${getHasCli("--touch")}`);
  console.log(`ASYNCV - getCliData("--touch") ${getCliData("--touch")}`);
  console.log(getCliData("--dir"));
  console.log(getCliData("--outDir"));
  console.log(getHasCli("--delete"));
  console.log(getHasCli("--ignore"));
})();
console.log(`getCliData("--dir") ${getCliData("--dir")}`);
console.log(`getCliData("--ls") ${getCliData("--ls")}`);
console.log(`getHasCli("--mkdir") ${getHasCli("--mkdir")}`);
console.log(`getHasCli("--touch") ${getHasCli("--touch")}`);
console.log(`getCliData("--touch") ${getCliData("--touch")}`);
console.log(getCliData("--dir"));
console.log(getCliData("--outDir"));
console.log(getHasCli("--delete"));
console.log(getHasCli("--ignore"));
/**
 * ------------------1
 */


// Try the following:
//    node options-variadic.js -n 1 2 3 --letter a b c
//    node options-variadic.js --letter=A -n80 operand
//    node options-variadic.js --letter -n 1 -n 2 3 -- operand

throw new Error(` Voilà c'est fini POINT DEBUG`)
/**
 * 
 * 
 * 
 * ---------------------------------------------------------
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */



// The first argument will be the project name.
const projectName: string = process.argv[2];
console.log(` DEBUG POINT // projectName = [${projectName}]`)
// Create a project directory with the project name.
const currentDir: string = process.cwd();
const projectDir: string = path.resolve(currentDir, projectName);

let returnedFolder = null;

console.log(` Ok ici on commence à créer le folder [projectDir]=[${projectDir}] `)

try {
  returnedFolder = fs.mkdirSync(projectDir, { recursive: true });
} catch (error) {
  console.log(`Ok ya eu une erreur [${JSON.stringify(error, null, 2)}]`)
}


// A common approach to building a starter template is to
// create a `template` folder which will house the template
// and the files we want to create.
const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, projectDir, { recursive: true });

// It is good practice to have dotfiles stored in the
// template without the dot (so they do not get picked
// up by the starter template repository). We can rename
// the dotfiles after we have copied them over to the
// new project directory.
fs.renameSync(
  path.join(projectDir, 'gitignore'),
  path.join(projectDir, '.gitignore')
);

const projectPackageJson = require(path.join(projectDir, 'package.json'));
export default projectPackageJson;

// Update the project's package.json with the new project name
projectPackageJson.name = projectName;

fs.writeFileSync(
  path.join(projectDir, 'package.json'),
  JSON.stringify(projectPackageJson, null, 2)
);

// Run `npm install` in the project directory to install
// the dependencies. We are using a third-party library
// called `cross-spawn` for cross-platform support.
// (Node has issues spawning child processes in Windows).
spawn.sync('npm', ['install'], { stdio: 'inherit' });

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);