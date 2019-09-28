'use strict';

module.exports = grunt => {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['the files you want to take action on'], //./src/**/tests/**/*.js
        tasks: ['NAME OF YOUR TASK']
      }
    }
  });

  grunt.registerTask('default', 'watch');
};
