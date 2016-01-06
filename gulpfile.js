// gulp file

var gulp = require("gulp");
var print = require("gulp-print");
var console = require("console");
var glob = require('glob');
var spawn = require('child_process').spawn;
var exec = require('gulp-exec');
var path = require('path');

var distBaseDir = './dist';
//var distBaseDir = './dist';

gulp.task('dist.ts', function() {
  console.info("Typescript transpiling");

  /*    gulp.src(['sabbat.notes.ui/ts/!**!/!*.ts'])
   .pipe(gfilemetadata({log: true}))
   .pipe(exec('node node_modules/typescript/bin/tsc -d -t ES5 --out sabbat.notes.ui/dist/<%= file.name %> <%= file.path %>', options));*/

  var tsc = spawn('node', ['node_modules/typescript/bin/tsc',
                          '-project', '.']);   //// using tsconfig.json

  tsc.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  tsc.stderr.on('data', function(data) {
    console.log(data.toString());
  });

  tsc.on('close', function(data) {
    console.log('Typescript compilier exited');
  });
});

gulp.task('dist.js', function() {
  gulp.src('src/*.{js,json}').
  pipe(gulp.dest(path.join(distBaseDir, '')));
});

gulp.task('dist.modules', function() {
    gulp.src('node_modules/**/*').
        pipe(gulp.dest(path.join(distBaseDir, 'node_modules')));
});

gulp.task('dist.test', function () {
    gulp.src(['test/**/*.js', 'test/**/*.json'])
       .pipe(gulp.dest(path.join(distBaseDir, 'test')));
});

//gulp.task('test.run', function () {
//    var opt = {
//        continueOnError: true, // default = false, true means don't emit error event
//        pipeStdout: false
//    };
//
//    gulp.src(path.join(distBaseDir, 'test/**/*Test.js'))
//        .pipe(print())
//        .pipe(exec(path.join(distBaseDir, 'node_modules/mocha/bin/mocha') + ' --ui tdd --reporter dot <%= file.path %>', opt))
//        .pipe(exec.reporter());
//});

gulp.task('dist', ['dist.ts']);


