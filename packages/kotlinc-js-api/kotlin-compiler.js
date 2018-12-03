'use strict';
const spawn = require('cross-spawn').spawn;
const isWindows = /^win/.test(process.platform);
const SUCCESS_CODE = 0;

function addOptionWithValue(options, optionName, optionValue, useEqual) {
  if (optionValue) {
    if (useEqual) {
      return options.concat(`${optionName}=${optionValue}`);
    }
    return options.concat(optionName, optionValue);
  }
  return options;
}

function convertOptionsIntoArguments(options) {
  let argumentsList = [
    '-output',
    options.output,
    options.sourceMaps ? '-source-map' : null,
    options.noStdlib ? '-no-stdlib ' : null,
    options.metaInfo ? '-meta-info' : null,
    options.noWarn ? '-nowarn' : null,
    options.verbose ? '-verbose' : null,
  ];

  argumentsList = addOptionWithValue(argumentsList, '-main', options.main);

  argumentsList = addOptionWithValue(
    argumentsList,
    '-source-map-embed-sources',
    options.sourceMapEmbedSources
  );
  argumentsList = addOptionWithValue(
    argumentsList,
    '-source-map-prefix',
    options.sourceMapPrefix
  );
  argumentsList = addOptionWithValue(
    argumentsList,
    '-source-map-source-roots',
    options.sourceMapSourceRoots
  );

  argumentsList = addOptionWithValue(
    argumentsList,
    '-kotlin-home',
    options.kotlinHome
  );
  argumentsList = addOptionWithValue(
    argumentsList,
    '-module-kind',
    options.moduleKind
  );
  argumentsList = addOptionWithValue(
    argumentsList,
    '-Xplugin',
    options.plugin,
    true
  );

  if (options.libraries && options.libraries.length) {
    argumentsList = argumentsList.concat(
      '-libraries',
      options.libraries.join(isWindows ? ';' : ':')
    );
  }

  if (options.experimental) {
    if (options.experimental.multiPlatform) {
      argumentsList = argumentsList.concat('-Xmulti-platform');
    }
    if (options.experimental.customArguments) {
      argumentsList = argumentsList.concat(
        options.experimental.customArguments
      );
    }
  }

  argumentsList = argumentsList.concat(options.sources);

  return argumentsList.filter(arg => !!arg);
}

function compile(options) {
  return new Promise((resolve, reject) => {
    const extension = isWindows ? '.bat' : '';

    const compilation = spawn(
      require.resolve(`kotlin-compiler/bin/kotlinc-js${extension}`),
      convertOptionsIntoArguments(options),
      { stdio: [process.stdin, process.stdout, 'pipe'] }
    );
    let errors = '';

    compilation.stderr.on('data', data => {
      errors += data.toString();
    });

    compilation.on('error', err => {
      errors += 'kotlin-js failed. Do you have Kotlin installed?';
      errors += JSON.stringify(err);
    });

    compilation.on('close', code => {
      if (code !== SUCCESS_CODE) {
        reject(errors || `Kotlin compiler exited with code ${code}`);
        return;
      }

      if (errors) {
        console.warn('Kotlin Compiler stderr output:', errors);
      }
      resolve();
    });
  });
}

module.exports = {
  compile: compile,
};
