const gulp = require('gulp');

const concat = require('gulp-concat');//文件合并

const uglify = require('gulp-uglify');//js文件压缩

const minifyCss = require('gulp-minify-css');//css文件压缩

const minifyHtml=require('gulp-minify-html');//html文件压缩

const load = require('gulp-load-plugins');//自动加载

const connect = require('gulp-connect');//自动刷新

//合并 压缩css文件->放置到dist文件中
gulp.task('concatCss',function(cb){
	gulp.src('./css/*.css')
	.pipe(concat('main.css'))
	.pipe(minifyCss())//压缩
	.pipe(gulp.dest('./dist/css'))
	.pipe(connect.reload())
	cb();
})

//合并 压缩js文件->放置到dist文件中
gulp.task('concatJs',function(cb){
	
	gulp.src('./js/*.js')
	.pipe(concat('main.js'))
	// .pipe(uglify())//压缩
	.pipe(gulp.dest('./dist/js'))
		.pipe(connect.reload())
	cb();
})

// 压缩 HTML文件
gulp.task('minifyHtml',function(cb){
	gulp.src('./fire.html')
	.pipe(minifyHtml())//压缩
	.pipe(gulp.dest('./dist'))
	.pipe(connect.reload())
	cb();
})

//
//一键生成
gulp.task('buld',gulp.series('concatCss','minifyHtml','concatJs'))
//
// gulp.task('build',function(cb){
	
// 	gulp.series('concatCss','concatJs','minifyHtml')
	
// 	cb();
// })

//1,x需要的地方加上conner.reload()
//2.reload函数
gulp.task('reload',function(cb){
	
	connect.server({
		livereload:true,
	})
	
	cb()
})
//3监听任务
gulp.task('watchs',function(cb){
	gulp.watch('./css/*.css',gulp.series('concatCss'))
	gulp.watch('./*html',gulp.series('minifyHtml'))
	gulp.watch('./js/*.js',gulp.series('concatJs'))
	cb()
})
//4启动任务reload服务,监控变化
gulp.task('run',gulp.series('reload','watchs'))






































// // 方式1
// gulp.task('sayHi',function(cb){
// 	console.log('Hi~,你好');
// 	cb();
// });
//gulp sayHi->执行
// 方式2
// gulp.task('default',function(cb){
	
// console.log('hi~!')
// 	cb();
// });
//gulp->执行
// 方式3
// function xm(cb){
// 	console.log('myName is xm');
// 	cb();
// }
// exports.xm = xm;
//gulp xm->执行

// function xh(){
// 	console.log('大家好,我叫xh,小名叫hx');
// }
// exports.default = xh;
// gulp ->执行

// gulp.src();
//创建一个流,用于读取文件
// gulp.dest();创建一个流,将别的文件导入文件系统
// gulp.src('./js/*.js')
// .pipe(gulp.dest('./distt'));

// gulp.task('importStream',function(cb){
	
// 	gulp.src('./js/*.js')
// 	.pipe(gulp.dest('./option/js'))
	
// 	cb();
// });
//文件放在了option下面的js文件

//合并js文件
// gulp.task('concatJs',function(cb){
// 	gulp.src('./js/*.js')
// 	.pipe(concat('main.js'))//将文件合并文main文件
// 	.pipe(gulp.dest('./option/js'));
	
// 	cb()
// });
// //js压缩
// // 安装：npm install --save-dev gulp-uglify
// //压缩不生效
// gulp.task('uglifyJs',function(cb){

// 	gulp.src('./option/js/main.js')
// 	.pipe(uglify())
// 	.pipe(gulp.dest('./option/js'))
	
// 	cb();
// })


// // 合并css文件;
// gulp.task('concatCss',function(cb){
// 	gulp.src('./css/*.css')
// 	.pipe(concat('main.css'))//将文件合并文main文件
// 	.pipe(gulp.dest('./option/css'));
// 	cb()
// });
//css压缩
//生效
// gulp.task('minifyCss',function(cb){
	
// 	gulp.src('./option/css/main.css')
// 	.pipe(minifyCss())
// 	.pipe(gulp.dest('./option/css'))
	
	
// 	cb()
// })

//合成html文件

//压缩HTML文件
// gulp.task('minifyHtml',function(cb){
// 	gulp.src('./fire.html')
// 	.pipe(minifyHtml())
// 	.pipe(gulp.dest('./option'))
	
	
// 	cb()
// })

//
//
//
// gulp.task('concatCss2',function(cb){
// 	gulp.src('./css/*.css')
// 	.pipe(concat('main.css'))
// 	.pipe(gulp.dest('./css'))
// 	cb()
// })
// gulp.task('concatJs2',function(cb){
// 	gulp.src('./js/*.js')
// 	.pipe(concat('main.js'))
// 	.pipe(gulp.dest('./js'))
// 	cb()
// })

// //监听事件将改变同步到压缩文件上
// gulp.task('watchs',function(){
	
// 	gulp.watch('./css/*.css',gulp.series('concatCss'))
// 	gulp.watch('./js/*.js',gulp.series('concatJs'))
// 	gulp.watch('./fire.html',gulp.series('minifyHtml'))
	
// })
