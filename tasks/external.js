module.exports = function(grunt) {

    grunt.registerTask("external", function() {
        console.log("external say foo is: " + grunt.config("external.foo"));
    });

};