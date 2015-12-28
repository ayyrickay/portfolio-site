'use strict';

module.exports = function (grunt) {

    // Show elapsed time after tasks run to visualize performance
    require('time-grunt')(grunt);
    // Load all Grunt tasks that are listed in package.json automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        path: {
          build: '_site/assets',
          inter: '.tmp',
          src: '_assets'
        },
        // shell commands for use in Grunt tasks
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve -H 0.0.0.0'
            }
        },

        // watch for files to change and run tasks when they do
        watch: {
            sass: {
                files: ['<%= path.src %>/sass/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer', 'combine_mq']
            }
            /*,styles: {
              files: ['_site/css/**
              //extra line break for comment
              /*.css'],
              tasks: ['autoprefixer']
            }*/
        },

        // sass (libsass) config
        sass: {
            options: {
                sourceMap: true,
                relativeAssets: false,
                outputStyle: 'expanded',
                sassDir: '<%= path.src %>/sass',
                cssDir: '<%= path.inter %>/css'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '_sass/',
                    src: ['**/*.{scss,sass}'],
                    dest: '<%= path.inter %>/css',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
          dist: {
            files: [{
              expand: true,
              cwd: '<%= path.inter %>/css',
              src: '**.*.css',
              dest: '<%= path.inter %>'
            }]
          }
        },

        combine_mq: {
          main: {
            src: '<%= path.inter %>/css/*.css',
            dest: '<%= path.build %>/css/main.css'
          }
        },

        // run tasks in parallel
        concurrent: {
            serve: [
                'sass',
                'autoprefixer',
                'combine_mq',
                'watch',
                'shell:jekyllServe'
            ],
            options: {
                logConcurrentOutput: true
            }
        }

    });

    // Register the grunt serve task
    grunt.registerTask('serve', [
        'concurrent:serve'
    ]);

    // Register the grunt build task
    grunt.registerTask('build', [
        'shell:jekyllBuild',
        'sass'
    ]);

    // Register build as the default task fallback
    grunt.registerTask('default', 'build');

};
