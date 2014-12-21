var gulp = require('gulp');
var browserify = require('browserify');
var fs = require('fs');
var del = require('del');
var reactify = require('reactify');

gulp.task('app', ['clean'], function() {
	return browserify('./src/main.js')
	.transform(reactify)
	.external(require.resolve('react'))
	.external(require.resolve('flux-react'))
	.external(require.resolve('moment'))
	.bundle(function(err, app) {
		fs.writeFile('./www/js/app.js', app);
	});
});

gulp.task('common', function() {
	del(['./www/js/common.js']);
	return browserify()
	.require(require.resolve('react'), { expose: 'react' })
	.require(require.resolve('flux-react'), { expose: 'flux-react' })
	.require(require.resolve('moment'), { expose: 'moment' })
	.bundle(function(err, libs) {
		fs.writeFile('./www/js/common.js', libs);
	});
});

gulp.task('clean', function(done) {
	del(['./www/js/app.js'], done);
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.js', ['app']);
});

gulp.task('default', ['watch', 'app', 'common']);
