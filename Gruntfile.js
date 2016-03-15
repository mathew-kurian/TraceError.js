module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

  const config = {
    babel: {
      dist: {
        files: {
          'dist/TraceError.js': 'src/TraceError.js'
        }
      }
    }
  };

  grunt.initConfig(config);
  grunt.registerTask('default', ['babel']);
};

