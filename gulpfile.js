const gulp = require('gulp');
const gulpPug = require('gulp-pug');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-sass')(require('sass'));
const { src, dest, parallel, series, watch } = require('gulp');

const dependCss = () => {
  return src([
    'node_modules/wowjs/css/libs/animate.css',
    'node_modules/layui/dist/css/layui.css',
    'node_modules/plyr/dist/plyr.css',
  ])
  .pipe(dest('dist/css'));
}

const dependJavascript = () => {
  return src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/wowjs/dist/wow.min.js',
    'node_modules/lodash/lodash.js',
    'node_modules/layui/dist/layui.js',
    'node_modules/plyr/dist/plyr.js',
  ])
  .pipe(uglify({ mangle: true }))
  .pipe(dest('dist/'));
}

const files = () => src('assets/*').pipe(dest('dist/'));
const css = () => src('assets/css/**/*.css').pipe(dest('dist/css'));
const fonts = () => src('assets/fonts/*').pipe(dest('dist/fonts'));
const images = () => src('assets/images/**/*').pipe(dest('dist/images'));
const javascript = () => {
  return src('assets/javascript/*.js')
    .pipe(uglify())
    .pipe(dest('dist/javascript'))
};

const scss = () => {
  return src('src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
      }),
      pxtorem({
        minPixelValue: 5,
        unitPrecision: 5,
        selectorBlackList: [],
        propList: ['*', '!border*'],
      }),
    ]))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(dest('dist/styles/'));
}

const pug = () => {
  return src('src/views/**/*.pug')
    .pipe(gulpPug({ pretty: true }))
    .pipe(dest('dist/'));
}

const watching = () => {
  watch('static/*', series(files));
  watch('assets/fonts/*', series(fonts));
  watch('assets/css/*/*.css', series(css));
  watch('src/scss/**/*.scss', series(scss));
  watch('assets/javascript/*.js', series(javascript));
  watch('assets/images/**/*', series(images));
  watch(['src/views/**/*.pug'], series(pug));
}

exports.watch = parallel(watching);
exports.default = series(dependJavascript, dependCss, files, fonts, css, scss, javascript, images, pug, watching);
exports.buildDists = series(dependJavascript, dependCss, files, fonts, css, scss, javascript, images, pug);
