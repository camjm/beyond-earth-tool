module.exports = function(grunt) {

	// Load the task plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('bar', function() {
		var bar = grunt.config.get('bar');
		var baz = bar.foo + 7;
		console.log('Bazz is ' + baz);
	});

	// Project configuration.
  	grunt.initConfig({
    	jshint: {
      		options: {
        		curly: true,
        		eqeqeq: true
      		},
      		target1: ['Gruntfile.js', 'src/**/*.js']
    	},
    	uglify: {
	      target1: {
	        src: 'foo.js',
	        dest: 'foo.min.js'
	      }
	    }
  	});

  	// Define the default task
	grunt.registerTask('default', ['jshint', 'uglify']);

};