/**
 * Created by jetbrains on 31/05/2017.
 */
'use strict';
const generate = require('gen-idea-libs');

const paths = require('../config/paths');

generate(
  {
    'kotlin-extensions': require.resolve('@hypnosphi/kotlin-extensions'),
    'kotlin-react': require.resolve('@hypnosphi/kotlin-react'),
    'kotlin-react-dom': require.resolve('@hypnosphi/kotlin-react-dom'),
    'kotlinx-html-js': require.resolve('@hypnosphi/kotlinx-html-js'),
  },
  paths.projectPath
);
