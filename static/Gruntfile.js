const { spawnSync } = require('child_process');

module.exports = function (grunt) {
  const webpackConfig = require('./webpack-config');
  const jamboConfig = require('./jambo.json');
  
  const outputDir = jamboConfig.dirs.output;
  grunt.initConfig({
    webpack: {
      myConfig: webpackConfig
    },
    watch: {
      all: {
        files: ['**', '!**/node_modules/**', `!${outputDir}/**`],
        tasks: ['build',],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', 'jambo build -> grunt webpack', () => {
    spawnSync('npm', ['run',  'build', '--silent'], { stdio: 'inherit' });
  });
}
