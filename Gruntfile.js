module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        less: {
            style: {
                files: {
                    'build/css/style.css' : ['source/less/style.less']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ["last 2 version", "ie 10"]
            },
            style: {
                src: "build/css/style.css"
            }
        },
        concat: {
            dist: {
                src: [ 'source/js/script.js', 'source/js/datepicker-ru.js', 'source/js/parallax.min.js'],
                dest: 'source/js/script_concat.js',
            },
        },
        uglify: {
            my_target: {
                files: {
                    'build/js/script.min.js': ['source/js/script_concat.js']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'build/css/style.min.css': ['build/css/style.css']
                }
            }
        },
        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    src: ["build/img/*.{png,jpg,gif,svg}"]
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'source/img/', src: ['**'], dest: 'build/img/'},
                    {expand: true, cwd: 'source/js/libs', src: ['**'], dest: 'build/js/libs/'},
                ],
            },
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'index_src.html'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn:false
            },
            style: {
                files: ['source/less/**/*.less'],
                tasks: ['less', 'autoprefixer', 'cssmin']
            },
            html: {
                files: ['*.html']
            },
            js: {
                files: ['source/js/*.js'],
                tasks: ['concat','uglify']
            }
        }
    });
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build:production', ['less', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'copy', 'imagemin', 'htmlmin']);
}
