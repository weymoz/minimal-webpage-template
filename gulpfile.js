const { src, dest, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

function html() {
    return src('src/templates/index.pug')
      .pipe(pug())
      .pipe(dest('build'));
}

function css() {
    return src('src/scss/*.scss')
      .pipe(sass())
      .pipe(dest('build/css'))
      .pipe(browserSync.stream());

}

function js() {
    return src('src/js/*.js', { sourcemaps: true  })
      .pipe(dest('build/js', { sourcemaps: true  }));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "build"
    },
    browser: "/usr/bin/google-chrome-stable",
  });

  watch('src/scss/*.scss', css);
  watch('src/templates/*.pug', html);
  watch('src/js/*.js', js);
  watch('build/**/*').on('change', browserSync.reload);
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js, parallel(serve));
