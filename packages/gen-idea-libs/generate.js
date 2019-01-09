'use strict';
const path = require('path');
const fs = require('fs');

/* sample usage:
  const generate = require('@jetbrains/gen-idea-libs')

  generate({
    'kotlin-extensions': require.resolve('@jetbrains/kotlin-extensions'),
    'kotlin-react': require.resolve('@jetbrains/kotlin-react'),
    'kotlin-react-dom': require.resolve('@jetbrains/kotlin-react-dom'),
    'kotlinx-html-js': require.resolve('kotlinx-html')
  }, '.')
*/

const findIml = function(directory) {
  const imlList = fs.readdirSync(directory).filter((element) => {
    var extName = path.extname(element);
    return extName === '.iml';
  });
  return imlList.length > 0 && imlList[0] || null
}

module.exports = function generate(packages, projectDir, imlPath) {
  const libTemplate = fs.readFileSync(
    path.join(__dirname, './libTemplate.xml'),
    'utf8'
  );
  const depTemplate =
    '<orderEntry type="library" name="%name%" level="project" />';
  let iml;
  let _imlPath = imlPath;
  if (_imlPath) {
    iml = fs.readFileSync(_imlPath, 'utf8');
  } else {
    try {
      const ideaDir = path.join(projectDir, '.idea');
      let imlFileName = findIml(ideaDir)
      _imlPath = path.join(ideaDir, imlFileName);

      iml = fs.readFileSync(_imlPath, 'utf8');
    } catch (e) {
      _imlPath = path.join(
        projectDir,
        `${path.basename(path.resolve(projectDir))}.iml`
      );
      try {
        let imlFileName = findIml(projectDir)
        _imlPath = path.join(projectDir, imlFileName);
        iml = fs.readFileSync(_imlPath, 'utf8');
      } catch (err) {
        console.warn(
          'gen-idea-libs failed to find %project-name%.iml file, skipping generation'
        );
        return;
      }
      
    }
  }
  Object.keys(packages).forEach(name => {
    const pkg = packages[name];
    const classes = path.relative(projectDir, path.join(pkg, '..'));
    fs.writeFile(
      path.join(projectDir, `.idea/libraries/${name.replace(/-/g, '_')}.xml`),
      libTemplate.replace(/%name%/g, name).replace(/%classes%/g, classes),
      err => {
        if (err) {
          throw err;
        }
      }
    );

    const dep = depTemplate.replace(/%name%/g, name);
    if (!iml.includes(dep)) {
      iml = iml.replace(/(\n\s+)<\/component>/, `$1  ${dep}$&`);
    }
  });
  fs.writeFile(_imlPath, iml, err => {
    if (err) {
      throw err;
    }
  });
};
