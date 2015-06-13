module.exports = function(grunt) {

	// Load the task plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
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

	// Project configuration.
  	grunt.initConfig({
  		bar: {
  			foo: 42
  		},
    	jshint: {
      		options: {
        		curly: true,
        		eqeqeq: true
      		},
      		target1: ['Gruntfile.js', 'src/**/*.js']
    	},
    	uglify: {
	      target1: {
	        src: 'src/foo.js',
	        dest: 'build/foo.min.js'
	      }
	    },
	    concat: {
	    	target1: {
	    		files: {
	    			"build/abc.js": ["src/a.js", "src/b.js", "src/c.js"]
	    		}
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
	grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'coffee', 'jade', 'stylus']);

};