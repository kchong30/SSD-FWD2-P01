// Initialize modules

// Import gulp specific API functions which allows us to write them
// below as [gulp-function-name] instead gulp.[function-name],
// for example:
// src() instead of gulp.src()
const { src, dest, watch, series, parallel } = require("gulp");

// Import Gulp plugins and npm packages that we need for this project
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-dart-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const replace = require("gulp-replace");
const browserSync = require("browser-sync").create();
const del = require("del");
const imageMin = require("gulp-imagemin");
const cache = require("gulp-cache");
const htmlMin = require("gulp-htmlmin");
//const cssnano = require('cssnano');

// Dev / Build State
// These variables are used to set the
// dev or build state of the Gulpfile
let devMode = true;
let buildMode = false;

// Use jQuery
// This variable is used to determine if the
// jQuery library is being used or not.
// Set to false if you do not need the jQuery library in your project
const useJQuery = true;

// File Names
const filenames = {};
filenames.jQuery = "jquery-3.6.0.min.js";
filenames.jsNoExtension = "script.min";
filenames.js = `${filenames.jsNoExtension}.js`;

// Folder Paths
const folders = {};
// Main Folders
folders.dev = "dev";
folders.dist = "dist";
folders.styles = "styles";
folders.sass = "scss";
folders.images = "images";
folders.media = "media";
folders.fonts = "fonts";
folders.webfonts = "webfonts";
folders.scripts = "scripts";
folders.libs = "libs";
folders.jQuery = "jquery";
// JavaScript Folders
folders.jsDev = `${folders.dev}/${folders.scripts}`;
folders.jsDist = `${folders.dist}/${folders.scripts}`;
folders.libsDev = `${folders.jsDev}/${folders.libs}`;
folders.libsDist = `${folders.jsDist}/${folders.libs}`;
// jQuery Folders
folders.jQueryDev = `${folders.libsDev}/${folders.jQuery}`;
folders.jQueryDist = `${folders.libsDist}/${folders.jQuery}`;
// Styles Folders
folders.stylesDev = `${folders.dev}/${folders.styles}`;
folders.stylesDist = `${folders.dist}/${folders.styles}`;
// Images Folders
folders.imagesDev = `${folders.dev}/${folders.images}`;
folders.imagesDist = `${folders.dist}/${folders.images}`;
// Media Folders
folders.mediaDev = `${folders.dev}/${folders.media}`;
folders.mediaDist = `${folders.dist}/${folders.media}`;
// Fonts Folders
folders.fontsDev = `${folders.dev}/${folders.fonts}`;
folders.fontsDist = `${folders.dist}/${folders.fonts}`;
folders.webfontsDev = `${folders.dev}/${folders.webfonts}`;
folders.webfontsDist = `${folders.dist}/${folders.webfonts}`;

// File Paths
const files = {};
// HTML Files
files.html = `${folders.dev}/**/*.html`;
files.htmlDist = `${folders.dist}/**/*.html`;
// Sass Files
files.sass = `${folders.dev}/${folders.sass}/**/*.scss`;
// CSS Files
files.styles = `${folders.dev}/${folders.styles}/**/*.css`;
// JavaScript Files
files.js = `${folders.jsDev}/**/!(${filenames.jsNoExtension})*.js`;
files.libs = `${folders.libsDev}/**/*.js`;
// jQuery Files
files.jQuery = `${folders.jQueryDev}/${filenames.jQuery}`;
// Images Files
files.images = `${folders.imagesDev}/**/*.+(png|jpg|gif|svg)`;
// Media Files
files.media = `${folders.mediaDev}/**/*`;
// Fonts Files
files.fonts = `${folders.fontsDev}/**/*`;
files.webfonts = `${folders.webfontsDev}/**/*`;

// Development Tasks

// Sass Task:
// 1. Compiles the Sass files into the dev styles folder
function sassTask() {
  return src(files.sass)
    .pipe(sourcemaps.init()) // Initializes sourcemaps (dev mode)
    .pipe(sass().on("error", sass.logError)) // compiles SCSS to CSS
    .pipe(sourcemaps.write(".")) // writes sourcemaps file (dev mode)
    .pipe(dest(folders.stylesDev)) // Puts CSS files in dev styles folder (dev mode)
    .pipe(browserSync.stream()); // Injects new CSS to the browser (dev mode)
}

// Sass Build Task:
// 1. Compiles the Sass files into the dist styles folder
function sassBuildTask() {
  return src(files.sass)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest(folders.stylesDist));
}

// JS Task:
// 1. Concatenates JS files into the dev scripts folder
function jsTask() {
  return src([files.libs, files.js, `!${files.jQuery}`])
    .pipe(sourcemaps.init()) // Initializes sourcemaps (dev mode)
    .pipe(concat(filenames.js)) // Concatenates JS files
    .pipe(sourcemaps.write(".")) // Writes sourcemaps (dev mode)
    .pipe(dest(folders.jsDev)); // Puts concatenated JS file in dev scripts folder (dev mode)
}

// JS Build Task:
// 1. Concatenates JS files into the dist scripts folder
function jsBuildTask() {
  return src([files.libs, files.js, `!${files.jQuery}`])
    .pipe(concat(filenames.js))
    .pipe(uglify())
    .pipe(dest(folders.jsDist));
}

// jQuery Task:
// 1. If useJQuery is set to true, copies jQuery to the dist scripts folder
function jQueryTask(done) {
  if (useJQuery === true) {
    src(files.jQuery).pipe(dest(folders.jQueryDist)); // Copies jQuery to the dist scripts folder
  }
  done();
}

// HTML Task:
// 1. Compresses the HTML files
// 2. Copies the compressed HTML files to the dist folder
function htmlTask() {
  return src(files.html)
    .pipe(htmlMin({ collapseWhitespace: true })) // Compresses the HTML files
    .pipe(dest(folders.dist)); // Copies compressed HTML files to the dist folder
}

// Images Task:
// 1. Compresses the image files
// 2. Copies the compressed image files to the dist images folder
function imagesTask() {
  return src(files.images)
    .pipe(cache(imageMin({ interlaced: true }))) // Compresses images
    .pipe(dest(folders.imagesDist)); // Copies compressed images to the dist images folder
}

// Media Task
// 1. Copies the media files (mainly videos) to the dist media folder
function mediaTask(done) {
  src(files.media).pipe(dest(folders.mediaDist)); // Copies the font files to the dist fonts folder
  done();
}

// Fonts Task:
// 1. Copies the font files to the dist fonts folder
function fontsTask(done) {
  src(files.fonts).pipe(dest(folders.fontsDist)); // Copies the font files to the dist fonts folder
  src(files.webfonts).pipe(dest(folders.webfontsDist)); // Copies the Font Awesome icon font files to the dist webfonts folder
  done();
}

// Cachebust Task:
// 1. Create a time stamp based on the current time
// 2. Replaces any query strings in the HTML files that uses the time stamp with the new timp stamp
function cacheBustTask(done) {
  const cbString = new Date().getTime(); // Create time stamp based on current time
  return src(files.htmlDist)
    .pipe(replace(/[.css?]cachebuster=\d+/g, "?cachebuster=" + cbString)) // Replace current time stamp CSS query string in the HTML files with the new time stamp
    .pipe(dest(folders.dist)); // Put the modified HTML files in the dist folder
}

function watchTask() {
  // Setup Browsersync for automatic reloading and re-freshing of CSS, Javascript and HTML
  browserSync.init({
    server: {
      baseDir: folders.dev,
    },
  });
  watch(files.sass, sassTask); // Watches the dev Sass directory (SCSS files only)
  watch(files.js).on("change", series(jsTask, browserSync.reload)); // Watches the dev JavaScript directory (JS files only)
  watch(files.html).on("change", browserSync.reload); // Watches the dev folder (HTML files only)
}

// Build Tasks

// Set Build State Task:
// 1. Sets devMode to false
// 2. Sets buildMode to true
function setBuildState(done) {
  devMode = false;
  buildMode = true;
  done();
}

// Clean Task:
// 1. Deletes all folders and files in the dist folder
function cleanTask(done) {
  del.sync(folders.dist);
  done();
}

// Default Task:
exports.default = series(parallel(sassTask, jsTask), watchTask);

// Build Task:
exports.build = series(
  setBuildState,
  cleanTask,
  parallel(sassBuildTask, jsBuildTask, jQueryTask),
  parallel(imagesTask, mediaTask, fontsTask),
  htmlTask,
  cacheBustTask
);
