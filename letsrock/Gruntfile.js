module.exports = function(grunt) {

grunt.initConfig({
		watch: {
			scripts: {
		    files: ['**/*.scss'],
		    tasks: ['sass'],
		    options: {
					outputStyle: 'compressed'
				},
    	},
		},
		sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'app/assets/stylesheets/main.css': 'app/assets/scss/main.scss'
            }
        }
    }
});
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['watch']);
grunt.registerTask('compile', ['sass']);

}
