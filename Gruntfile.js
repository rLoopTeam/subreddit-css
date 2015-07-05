module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Copy everything to build
    copy: {
      build: {
        cwd: 'src',
        src: ['**'],
        dest: 'build',
        expand: true
      }
    },

    // Clean /dist
    clean: {
      build: {
        src: ['build']
      },
      stylesheets: {
        src: ['build/**/*.css', 'build/**/*.scss', '!build/bundle.css']
      },
      vendor: {
        src: ['build/vendor']
      },
    },

    // compile scss to css
    sass: {
      dist: {
        files: {
          'build/bundle.css' : 'src/main.scss'
        }
      }
    },

    // Minify the CSS
    cssmin: {
      build: {
        files: {
          'build/bundle.css': ['build/vendor/**/*.css', 'build/bundle.css']
        }
      }
    },

    // Auto add vendor prefixes
    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      }
    },

    // Watch
    watch: {
      options: {
        livereload: true
      },
      stylesheets: {
        files: ['src/**/*.scss', 'src/**/*.css'],
        tasks: ['build']
      }
    }
  });
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('stylesheets', 'Compiles the stylesheets.', ['sass', 'autoprefixer', 'cssmin', 'clean:stylesheets']);

  grunt.registerTask('build', 'Compiles all of the assets and copies the files to the build directory.', ['clean:build', 'copy', 'stylesheets', 'clean:vendor']);
  
  grunt.registerTask('default', 'Watches the project for changes, automatically builds them and runs a server.', [ 'build', 'watch' ]);
};