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
        src: ['./src/**/tests/**/*.js']
      }
    },
    watch: {
      scripts: {
        files: ['./src/**/tests/**/*.js'],
        tasks: ['mochaTest']
      }
    }
  });

  grunt.registerTask('default', 'watch');
};
