'use strict';
const spawn = require('child_process').spawn;

function convertOptionsIntoArguments(options) {
    var argumentsList = [
        '-output',
        options.output,
        options.sourceMaps ? '-source-map' : null,
        options.noStdlib ? '-no-stdlib ' : null,
        options.metaInfo ? '-meta-info' : null,
        options.noWarn ? '-nowarn' : null,
        options.verbose ? '-verbose' : null
    ];

    if (options.main) {
        argumentsList = argumentsList.concat('-main', options.main);
    }

    if (options.moduleKind) {
        argumentsList = argumentsList.concat('-module-kind', options.moduleKind);
    }

    if (options.libraries && options.libraries.length) {
        argumentsList = argumentsList.concat('-libraries', options.libraries.join(':'))
    }

    argumentsList = argumentsList.concat(options.sources)

    return argumentsList.filter(arg => !!arg);
}

function compile(options) {
    return new Promise((resolve, reject) => {
        var compilation = spawn(__dirname + `/compiler/bin/kotlinc-js`,
            convertOptionsIntoArguments(options),
            {stdio: [process.stdin, process.stdout, 'pipe']}
        );
        var hasErrors = false;
        var errors = '';

        compilation.stderr.on('data', (data) => {
            hasErrors = true;
            errors += data.toString();
        });

        compilation.on('error', (err) => {
            hasErrors = true;
            errors += 'kotlin-js failed. do you have kotlin installed?';
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
    compile: compile
};
