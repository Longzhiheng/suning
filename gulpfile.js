
const gulp = require('gulp');//引入gulp模块  gulp对象
const html = require('gulp-minify-html');//引入gulp-minify-html模块。
const css = require('gulp-minify-css');//引入gulp-minify-css模块。
const uglifyjs = require('gulp-uglify');
const watch = require('gulp-watch');
const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块
//1.简单的gulp任务
// gulp.task('default',function(){//default默认的任务名，编译的时候只需要写gulp
//     console.log('hello,gulp');
// });

//2.文件的复制
// gulp.task('copyfile',function(){
//     return gulp.src('src/html/*.html')
//     .pipe(gulp.dest('dist/'));
// });

//3.html文件的压缩。
gulp.task('uglifyhtml', function () {
    return gulp.src('src/html/*.html')
        .pipe(html())//执行html压缩
        .pipe(gulp.dest('dist/html/'))//输出,没有自动创建
});

//4.css文件的压缩。
gulp.task('uglifycss', function () {
    return gulp.src('src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('dist/css/'));
});

// //5.js的压缩
// gulp.task('uglifyjs', function () {
//     return gulp.src('src/js/*.js')
//         .pipe(uglifyjs())
//         .pipe(gulp.dest('dist/js/'));
// });
//6.es6转es5
// gulp.task('babel',function(){
//     return gulp.src('src/js/*.js')
//     .pipe(babel({
//         presets:['es2015']
//     }))
//     .pipe(gulp.dest('dist/js/'));
// });
//转码，压缩的合并实现
gulp.task('babel', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js/'));
});


//7.sass编译成css
// gulp.task('runsass', function () {
// 	return gulp.src('src/sass/*.scss')
// 		.pipe(gulpsass({
// 			outputStyle: 'compressed'
// 		})) //执行编译,compressed:压缩一行
// 		.pipe(gulp.dest('dist/css/'));
// });

// //8.png图片的压缩
// gulp.task('runimg',function(){
// 	return gulp.src('src/img/*.png')
// 	.pipe(imagemin())
// 	.pipe(gulp.dest('dist/img/'));
// });

//6.监听
gulp.task('default', function () {
    watch(['src/html/*.html', 'src/css/*.css', 'src/js/*.js'], gulp.parallel('uglifyhtml', 'uglifycss', 'babel'));
    //watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
    //gulp.parallel() –并行运行任务 
});
