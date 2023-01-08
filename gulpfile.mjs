import gulp from "gulp";
import jshint from "gulp-jshint";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import cleanCSS from "gulp-clean-css";
import removeCode from "gulp-remove-code";
import merge from "merge-stream";
import { deleteSync } from "del";
import gzip from "gulp-gzip";
import htmlmin from "gulp-htmlmin";
import replace from "gulp-replace";
import fs from "fs";
import inlineFonts from "gulp-inline-fonts";
import smoosher from "gulp-smoosher";
import size from "gulp-filesize";

// Add "unicode.dis" if you need unicode
var TABLES_TO_KEEP = ["en-ueb-g1.ctb", "en-ueb-chardefs.uti", "en-ueb-g2.ctb", "en-ueb-math.ctb", "latinLetterDef8Dots.uti", "braille-patterns.cti"];

function updateLiblouis() {
  // Remove unused table data from liblouis build
  // You should have run npm install before this task runs so that it can find the build in node_modules
  fs.readFile("node_modules/liblouis-build/build-tables-embeded-root-utf16.js", "utf8", (error, content) => {
    if (error) {
      throw error;
    }
    const lines = content.split("\n");
    const filenameMap = {};

    for (const line of lines) {
      if (line.includes("Module['FS_createDataFile']")) {
        const parts = line.split(",").map(part => part.trim().replace(/'|"/g, ""));
        if (TABLES_TO_KEEP.includes(parts[1])) {
          filenameMap[parts[1]] = parts[2];
        }
      }
    }
    console.log(filenameMap);
    fs.writeFile("www/js/build-tables-embeded-root-utf16.js", "", (error) => {
      if (error) {
        throw error;
      }
      for (const line of lines) {
        let keep = true;
        if (line.includes(".push.apply(") || line.includes("Module['FS_createDataFile']") || line.includes("var fileData")) {
          keep = false;
          for (const table of TABLES_TO_KEEP) {
            if (line.includes(filenameMap[table])) {
              keep = true;
              break;
            }
          }
        }
        if (keep) {
          fs.appendFileSync("www/js/build-tables-embeded-root-utf16.js", `${line}\n`);
        }
      }
    });
  });
}

function clean() {
  return new Promise(function (resolve, reject) {
    deleteSync(["dist"]);
    resolve();
  });
}

function lint() {
  return gulp
    .src("www/js/**/app.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
}

function copyTest() {
  return merge(
    gulp
      .src(["www/index.html"])
      .pipe(removeCode({ production: false }))
      .pipe(removeCode({ cleanheader: true }))
      .pipe(gulp.dest("dist")),
    gulp.src(["www/images/**/*.*"]).pipe(gulp.dest("dist/images"))
  );
}

function copy() {
  return merge(
    gulp
      .src(["www/index.html"])
      .pipe(removeCode({ production: true }))
      .pipe(removeCode({ cleanheader: true }))
      .pipe(gulp.dest("dist")),
    gulp.src(["www/images/**/*.*"]).pipe(gulp.dest("dist/images"))
  );
}

function icons() {
  return merge(
    gulp
      .src(["www/css/BrailleFont/*"])
      .pipe(inlineFonts({ name: "aph_braille_shadowsregular" }))
      .pipe(gulp.dest("dist/fonts/")),
    gulp
      .src(["www/css/InterFont/*"])
      .pipe(inlineFonts({ name: "Inter" }))
      .pipe(gulp.dest("dist/fonts/"))
  );
}

function concatAppTest() {
  return merge(
    gulp
      .src(["www/js/**/*.js"])
      .pipe(concat("app.js"))
      .pipe(removeCode({ production: false }))
      .pipe(removeCode({ cleanheader: true }))
      .pipe(gulp.dest("./dist/js")),

    gulp
      .src(["www/css/**/*.css", "./dist/fonts/*.css"])
      .pipe(concat("style.css"))
      .pipe(gulp.dest("./dist/css/"))
  );
}

function concatApp() {
  return merge(
    gulp
      .src(["www/js/**/*.js"])
      .pipe(concat("app.js"))
      .pipe(removeCode({ production: true }))
      .pipe(removeCode({ cleanheader: true }))
      .pipe(gulp.dest("./dist/js")),

    gulp
      .src(["www/css/**/*.css", "./dist/fonts/*.css"])
      .pipe(concat("style.css"))
      .pipe(gulp.dest("./dist/css/"))
  );
}

function replaceSVG() {
  // Inserts the correct raw SVG code wherever the special <!-- replaceSVG --> was used
  return gulp
    .src("dist/**")
    .pipe(
      replace(
        /<!-- replaceSVG -->(.*?)<!-- \/replaceSVG -->/g,
        function (match, p1) {
          var parts = match.split('data="');
          var name = parts[1].split('.svg')[0];
          var contents = fs.readFileSync(`dist/${name}.svg`, "utf8").toString();
          return contents.replace(/(?:\r\n|\r|\n)/g,"");
        }
      )
    )
    .pipe(gulp.dest("dist"));
}


function englishOnly() {
  return gulp
    .src("dist/js/app.js")
    .pipe(removeCode({ de_lang_disabled: true }))
    .pipe(removeCode({ en_lang_disabled: false }))
    .pipe(removeCode({ es_lang_disabled: true }))
    .pipe(removeCode({ fr_lang_disabled: true }))
    .pipe(removeCode({ it_lang_disabled: true }))
    .pipe(removeCode({ ja_lang_disabled: true }))
    .pipe(removeCode({ hu_lang_disabled: true }))
    .pipe(removeCode({ pl_lang_disabled: true }))
    .pipe(removeCode({ ptbr_lang_disabled: true }))
    .pipe(removeCode({ ru_lang_disabled: true }))
    .pipe(removeCode({ tr_lang_disabled: true }))
    .pipe(removeCode({ uk_lang_disabled: true }))
    .pipe(removeCode({ zh_cn_lang_disabled: true }))
    .pipe(gulp.dest("./dist/js/"));
}

function minifyApp() {
  return merge(

    gulp
      .src(["dist/js/app.js"])
      .pipe(uglify({ mangle: true }))
      .pipe(gulp.dest("./dist/js/")),

    gulp
      .src("dist/css/style.css")
      .pipe(
        cleanCSS({ debug: true }, function (details) {
          console.log(details.name + ": " + details.stats.originalSize);
          console.log(details.name + ": " + details.stats.minifiedSize);
        })
      )
      .pipe(gulp.dest("./dist/css/")),

    gulp
      .src("dist/index.html")
      .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
      .pipe(gulp.dest("dist"))
  );
}

function includeHtml() {
  return merge(
    gulp
      .src("dist/index.html")
      .pipe(
        replace(
          /<file-include w3-include-html="'sub\/(.*?)'"><\/file-include>/g,
          function (match, p1) {
            return fs.readFileSync("www/sub/" + p1, "utf8");
          }
        )
      )
      .pipe(gulp.dest("dist/"))
  );
}

function smoosh() {
  return gulp.src("dist/index.html").pipe(smoosher()).pipe(gulp.dest("dist"));
}

function setTest() {
  // Set the variable IS_UI_TEST to true in the javascript
  return gulp
    .src("dist/index.html")
    .pipe(
      replace(
        "var IS_UI_TEST = false;", "var IS_UI_TEST = true;"
      )
    )
    .pipe(gulp.dest("dist"));
}

function setDemo() {
  // Set the variable IS_UI_TEST to false in the javascript
  return gulp
    .src("dist/index.html")
    .pipe(
      replace(
        "var IS_UI_DEMO = false;", "var IS_UI_DEMO = true;"
      )
    )
    .pipe(gulp.dest("dist"));
}

function compress() {
  return gulp
    .src("dist/index.html")
    .pipe(gzip({ gzipOptions: { level: 9 } }))
    .pipe(gulp.dest("."))
    .pipe(size());
}

gulp.task(clean);
gulp.task(lint);
gulp.task(copy);
gulp.task(copyTest);
gulp.task(replaceSVG);
gulp.task(concatApp);
gulp.task(icons);
gulp.task(concatAppTest);
gulp.task(minifyApp);
gulp.task(smoosh);
gulp.task(setTest);

var packageSeries = gulp.series(
  clean,
  lint,
  copy,
  icons,
  concatApp,
  replaceSVG,
  includeHtml,
  includeHtml,
  englishOnly,
  replaceSVG,
  minifyApp,
  smoosh,
  compress
);

var package2testSeries = gulp.series(
  clean,
  lint,
  copyTest,
  icons,
  concatAppTest,
  replaceSVG,
  includeHtml,
  includeHtml,
  englishOnly,
  replaceSVG,
  smoosh,
  setTest
);

var package2demoSeries = gulp.series(
  clean,
  lint,
  copyTest,
  icons,
  concatAppTest,
  replaceSVG,
  includeHtml,
  includeHtml,
  englishOnly,
  replaceSVG,
  smoosh,
  setDemo
);

gulp.task('updateLiblouis', function() { 
  return new Promise(function(resolve, reject) {
    updateLiblouis();
    resolve();
  });
});
gulp.task("package", packageSeries);
gulp.task("package2test", package2testSeries);
gulp.task("package2demo", package2demoSeries);
