/**
 * Created by vincentma on 9/2/16.
 */

(function(global) {
    var path = {
            // paths serve as alias
            'npm:': 'node_modules/'
    };

    var map = {
        // our app is within the app folder
        app: 'app',

        // angular bundles
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        // angular testing umd bundles
        '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
        '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
        '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
        '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
        '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
        '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
        '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',

        // other libraries
        'rxjs': 'npm:rxjs',
        'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',

        // others
        'angular2-fontawesome': 'node_modules/angular2-fontawesome'
    };

    var packages = {
        app: {
            main: './main.js',
                defaultExtension: 'js'
        },
        rxjs: {
            defaultExtension: 'js'
        },
        'angular2-in-memory-web-api': {
            defaultExtension: 'js'
        },
        'angular2-fontawesome':       { defaultExtension: 'js' }
    };

    System.config({
        paths: path,
        map: map,
        packages: packages
    });

    global.bootstrapping = System.import( "app" )
        .then(
            function handleResolve() {
                console.info( "System.js successfully bootstrapped app." );
            },
            function handleReject( error ) {
                console.warn( "System.js could not bootstrap the app." );
                console.error( error );
                return( Promise.reject( error ) );
            }
        );
})(window);
