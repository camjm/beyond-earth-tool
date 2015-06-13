module.exports = function(grunt) {

	// Load the task plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.registerTask('foo', function() {
		console.log('foo is running...');
	});

	grunt.registerTask('bar', function() {
		var bar = grunt.config.get('bar');
		var baz = bar.foo + 7;
		console.log('Bazz is ' + baz);
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
    	jshint: {
      		options: {
        		curly: true,
        		eqeqeq: true
      		},
      		target1: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
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
	    			"build/abc.js": ["src/a.js", "src/b.js", "src/c.js"]
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
	    }
  	});

  	// Define the default task
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'coffee', 'jade', 'stylus']);

};