module.exports = function () {
  var projectDir = process.env.PWD = process.cwd() + '/',
    nodeModules = projectDir + 'node_modules/',
    srcDir = 'src/',

  distDir = 'www/',
    distScriptsDir = distDir + 'scripts/',
    distStylesDir = distDir + 'styles/';

  var pipelines = {
    styles: {
      src: {
        normalize: nodeModules + 'normalize.css/normalize.css',
        app: srcDir + 'styles/questionnaire.scss',
      },
      dest: distStylesDir
    },
  };
  return pipelines;
};
