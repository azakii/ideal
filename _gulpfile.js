var gulp = require('gulp'),
	sass = require('gulp-ruby-sass')
	notify = require("gulp-notify")
	bower = require('gulp-bower')
	browserSync = require('browser-sync').create()
	uglify = require('gulp-uglify')
	concat = require('gulp-concat')
	rtlcss = require('gulp-rtlcss')
	wrap = require('gulp-wrap')
	rename = require('gulp-rename')
	uncss = require('gulp-uncss')
	size = require('gulp-size');

var config = {
	sassPath: './resources/sass',
	bowerDir: './bower_components',
	css: './public/ui/stylesheet',
	jqueryPath: './public/ui/javascript',
}

// BOWER TASK 
// -----------------------------------------------------------
gulp.task('bower', function () {
	return bower()
		.pipe(gulp.dest(config.bowerDir))
});

// TASK FOR COMPILING ALL CSS FILES
// -----------------------------------------------------------
gulp.task('sass', function () {
	return sass(config.sassPath + '/*scss', {
		style: 'compressed',
		loadPath: [
			'./resources/sass',
			config.bowerDir + '/bootstrap-sass/assets/stylesheets'
		]
	})
	.pipe(gulp.dest(config.css))
	.pipe(size())
	.pipe(browserSync.stream())
	.pipe(rtlcss()) // Convert to RTL. 
        .pipe(rename({ suffix: '-arabic' })) // Append "-rtl" to the filename. 
        .pipe(gulp.dest(config.css)) // Output RTL stylesheets.
	.pipe(size())
	.pipe(browserSync.stream());
});

gulp.task('uncss', function () {
    return gulp.src('./public/ui/stylesheet/*.css')
        .pipe(uncss({
            html: ['./public/*.html']
        }))
	.pipe(size())
        .pipe(gulp.dest('./public/ui/stylesheet/min'));
});

// TASK FOR MERGING ALL THE JS IN ONE
// -----------------------------------------------------------
gulp.task('js', function () {
	return gulp.src(['./resources/jquery/plugins/*js', './resources/jquery/uicreep.js'])
		.pipe(uglify())
		.pipe(wrap('\n// Jquery used is (<%= file.path %>)\n<%= contents %>'))
		.pipe(concat('uicreep-minify.js'))
		.pipe(size())
		.pipe(gulp.dest(config.jqueryPath))
		//.pipe(browserSync.stream());
});


// create a task that ensures the `js` task is complete before
// reloading browsers
// -------------------------------------------------------------------------
gulp.task('js-watch', ['js'], browserSync.reload);


// Static Server + watching scss/html files
// -------------------------------------------------------------------------
gulp.task('serve', ['sass'], function () {
	browserSync.init({
		injectChanges: true,
		server: "./public"
	});
	gulp.watch("./resources/sass/*scss", ['sass']);
	gulp.watch("./public/*.html").on('change', browserSync.reload);
	gulp.watch("./resources/jquery/*js", ['js-watch']);
});

// Task to get the size of the build project
gulp.task('build-size', function() {  
  	gulp.src('./public/*.html')
  		.pipe(size({
    		showFiles: true,
  	}));
});
// webserver task
// --------------------------------------
gulp.task('default', ['bower','serve','build-size']);
gulp.task('dev', ['uncss']);