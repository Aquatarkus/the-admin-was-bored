(function() {

  "use strict";

  var gulp = require( "gulp" );
  var jscs = require( "gulp-jscs" );

  var scripts = [
    "**/*.js",
    "!app/scripts/lib/*",
    "!node_modules/*"
  ];

  gulp.task( "scripts", function() {
    return gulp.src( scripts )
      .pipe( jscs() )
      .pipe( jscs.reporter() );
  });

  gulp.task( "watch", function() {
    gulp.watch( scripts, [ "scripts" ]);
  });

})();
