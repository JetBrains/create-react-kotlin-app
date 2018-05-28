'use strict';
const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

function spawnChildProcess(command, args) {
  console.log('Running command: ', command, args.join(' '));
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: [process.stdin, process.stdout, 'pipe'],
      shell: true,
    });

    const errors = [];

    proc.stderr.on('data', err => {
      const errorMessage = err.toString();
      errors.push(errorMessage);
    });

    proc.on('error', err => {
      console.error(`\`${command} ${args.join(' ')}\` failed`, err);
      reject(err.toString());
    });

    proc.on('close', code => {
      if (code !== 0) {
        const errorMessage =
          errors.join('') ||
          `Error. \`${command} ${args.join(' ')}\` exited with code=${code}`;
        return reject(errorMessage);
      }
      resolve();
    });
  });
}

function getPackageDependencies() {
  const pkg = require(path.resolve(process.cwd(), 'package.json'));
  return pkg.dependencies;
}

function getPackageVersion(packageName) {
  return getPackageDependencies()[packageName];
}

function getPackageTypeFilePath(name) {
  const typePackage = require(path.resolve(
    process.cwd(),
    `./node_modules/@types/${name}/package.json`
  ));
  // Looks like types packages always have just index.d.ts file
  // See https://github.com/DefinitelyTyped/DefinitelyTyped#create-a-new-package
  const typesFileName = typePackage.typings || 'index.d.ts';

  const typingsFilePath = path.resolve(
    '.',
    `./node_modules/@types/${name}/${typesFileName}`
  );

  if (fs.existsSync(typingsFilePath)) {
    return typingsFilePath;
  }

  console.log("Looks like package has embedded types. Let's check...");

  const packageItself = require(path.resolve(
    process.cwd(),
    `./node_modules/${name}/package.json`
  ));
  if (!packageItself.typings) {
    throw new Error(
      `Cannot find types for package ${name}. It has no types in @types/${name} and no "typings" field in package.json`
    );
  }

  return path.resolve('.', `./node_modules/${name}/${packageItself.typings}`);
}

function installTypes(packageName) {
  const command = 'npm';
  const [name, askedVersion] = packageName.split('@');
  const version = askedVersion || getPackageVersion(packageName) || 'latest';

  const args = ['install', `@types/${name}@${version}`, '--no-save'];

  return spawnChildProcess(command, args).then(() =>
    console.log(
      `Package ${packageName} has been installed to node_modules/@types/${packageName}.`
    )
  );
}

function convertTypesToKotlin(packageName, destinationDir) {
  const [name] = packageName.split('@');
  const command = 'node';
  const ts2ktPath = require.resolve('ts2kt');

  const args = [ts2ktPath, '-d', destinationDir, getPackageTypeFilePath(name)];

  return spawnChildProcess(command, args).then(() =>
    console.log(
      `Types for ${name} have been converted and put into ${destinationDir}.`
    )
  );
}

module.exports = {
  installTypes,
  convertTypesToKotlin,
  getPackageDependencies,
};
