/**
 * Created by jetbrains on 31/05/2017.
 */
'use strict';
const generate = require('@jetbrains/gen-idea-libs');

const paths = require('../config/paths');

generate(
  {
    'kotlin-extensions': require.resolve('@jetbrains/kotlin-extensions'),
    'kotlin-react': require.resolve('@jetbrains/kotlin-react'),
    'kotlin-react-dom': require.resolve('@jetbrains/kotlin-react-dom'),
    'kotlinx-html-js': require.resolve('@hypnosphi/kotlinx-html-js'),
  },
  paths.projectPath
);
