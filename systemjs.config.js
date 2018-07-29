/**
 * Created by Vincent Ma on 9/2/16.
 */

(function (global) {
    let path = {
        // paths serve as alias
        'npm:': 'node_modules/'
    };

    let map = {
        // our app is within the app folder
        app: 'dist/app',

        // angular bundles
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        // angular testing umd bundles
        '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
        '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
        '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
        '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
        '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
        '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',

        // other libraries
        'rxjs': 'npm:rxjs',
        'rxjs/operators': 'npm:rxjs/operators'
    };

    let packages = {
        'dist/app': {
            main: 'main.js',
            defaultExtension: 'js'
        },
        'rxjs': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        'rxjs/operators': {
            main: 'index.js',
            defaultExtension: 'js'
        }
    };

    System.config({
        paths: path,
        map: map,
        packages: packages
    });

    global.bootstrapping = Promise.all([
        System.import('rxjs'),
        System.import('rxjs/operators'),
        System.import('app')
    ]).then(
        function handleResolve() {
            console.info('System.js successfully bootstrapped app.');
        },
        function handleReject(error) {
            console.warn('System.js could not bootstrap the app.');
            console.error(error);
            return (Promise.reject(error));
        }
    );
})(window);
