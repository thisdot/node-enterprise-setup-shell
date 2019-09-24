'use strict';

module.exports = grunt => {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/**/*.js']
      }
    },
    watch: {
      scripts: {
        files: ['tests/**/*.js'],
        tasks: ['mochaTest']
      }
    }
  });

  grunt.registerTask('default', 'watch');
};
