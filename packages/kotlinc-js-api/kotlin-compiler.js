'use strict';
const spawn = require('cross-spawn').spawn;
const isWindows = /^win/.test(process.platform);

function addOptionWithValue(options, optionName, optionValue) {
  if (optionValue) {
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
    let hasErrors = false;
    let errors = '';

    compilation.stderr.on('data', data => {
      hasErrors = true;
      errors += data.toString();
    });

    compilation.on('error', err => {
      hasErrors = true;
      errors += 'kotlin-js failed. Do you have Kotlin installed?';
      errors += JSON.stringify(err);
    });

    compilation.on('close', () => {
      if (hasErrors === false) {
        resolve();
      } else {
        reject(errors);
      }
    });
  });
}

module.exports = {
  compile: compile,
};
