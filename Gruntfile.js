var fs = require('fs');				// a built-in node package
var request = require('request');	// an npm package

module.exports = function(grunt) {

	console.log('runtime option bar is: ' + grunt.option('bar'));
	console.log('runtime option dubug is: ' + grunt.option('debug'));

	// Load the task plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.registerTask('foo', function(p1, p2) {
		console.log('foo is running...');
		console.log('This task "%s" has arguments %j', this.name, this.args);
		console.log("first parameter is: " + p1);
		console.log("second parameter is: " + p2);
	});

	grunt.registerTask('bar', function() {
		var bar = grunt.config.get('bar');
		var baz = bar.foo + 7;
		console.log('Bazz is ' + baz);
	});

	grunt.registerTask('log-deploy', 'log deployment', function() {
		var message = 'Deployment on ' + new Date();
		fs.appendFileSync('deploy.log', message + '\n');
		console.log('Appended "' + message + '"');
	});

	grunt.registerMultiTask('copy', 'copy files', function() {
		this.files.forEach(function(file) {
			grunt.file.copy(file.src, file.dest);
		});
		console.log('Copied ' + this.files.length + ' files');
	});

	grunt.registerTask('webget', '', function() {
		var url = 'https://raw.github.com/jpillora/' + 'gswg-examples/master/README.md';
		var done = this.async();
		request(url, function(err, response, contents) {
			if (err) {
				done(err);
			} else if (response.statusCode !== 200) {
				done(new Error('Not OK'));
			} else {
				grunt.file.write('build/FILE.md', contents);
				grunt.log.ok('FILE.md successfully created');
				done();
			}
		});
	});

	grunt.registerTask('check', function() {
		if(grunt.file.exists('.jshintrc')) {
			// programmatically run task
			grunt.task.run('jshint:target2');
		}
	});

	// Project configuration
  	grunt.initConfig({
  		bar: {
  			foo: 42
  		},
  		// should this banner be a separate grunt plugin?
  		pkg: grunt.file.readJSON('package.json'),
  		banner: '/*! <%= pkg.name %> -v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
  		'* <%= pkg.homepage %>\n' +
  		'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n',
  		srcFiles: ["src/a.js", "src/b.js", "src/c.js"],
    	copy: {
    		target1: {
				files: {
					'build/file1.txt': 'src/file1.txt',
					'build/file2.txt': 'src/file2.txt'
				}
    		},
    		target2: {
    			files: {
    				'build/file3.txt': 'src/file3.txt',
    				'build/file4.txt': 'src/file4.txt'
    			}
    		}
    	},
    	jshint: {
      		options: {
        		curly: true,
        		eqeqeq: true
      		},
      		all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      		target2: {
  				options: {
  					jshintrc: '.jshintrc'
  				},
  				files: {
  					src: ['Gruntfile.js', 'src/**/*.js']
  				}
      		}
    	},
    	clean: {
    		src: ['build']
    	},
	    concat: {
	    	options: {
	    		banner: '<%= banner %>',
	    		stripBanners: true
	    	},
	    	target1: {
	    		files: {
	    			"build/abc.js": "<%= srcFiles %>"
	    		}
	    	}
	    },
    	uglify: {
    		options: {
    			banner: '<%= banner %>'
    		},
	      target1: {
	        src: 'build/abc.js',
	        dest: 'build/abc.min.js'
	      }
	    },
	    coffee: {
	    	target1: {
	    		expand: true,
	    		flatten: true,
	    		cwd: 'src/',
	    		src: ['*.coffee'],
	    		dest: 'build/',
	    		ext: '.js'
	    	},
	    	target2: {
	    		files: {
	    			'build/bazz.js': 'src/*.coffee'
	    		}
	    	}
	    },
	    jade: {
	    	options: {
	    		pretty: true,
	    		data: function(dest, src) {
	    			return {
	    				from: src,
	    				to: dest
	    			};
	    		}
	    	},
	    	target1: {
	    		files: {
	    			"build/foo.html": "src/foo.jade",
	    			"build/bar.html": "src/bar.jade"
	    		}
	    	}
	    },
	    stylus: {
	    	target1: {
	    		files: {
	    			"build/foo.css": "src/foo.styl"
	    		}
	    	}
	    },
	    watch: {
	    	target1: {
	    		files: '<%= srcFiles %>',
	    		tasks: ['concat']
	    	}
	    }
  	});

  	// Define the default task
	grunt.registerTask('default', ['jshint:all', 'clean', 'concat', 'uglify', 'coffee', 'jade', 'stylus']);

	grunt.registerTask('custom-tasks', 'Alias for my custom tasks', ['check', 'foo:a:b', 'bar', 'log-deploy', 'copy:target2', 'webget']);

	grunt.registerTask('watching', ['watch']);
};