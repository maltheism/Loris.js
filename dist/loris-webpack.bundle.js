/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var _app = __webpack_require__(1);

var _app2 = _interopRequireDefault(_app);

var _config = __webpack_require__(8);

var _config2 = _interopRequireDefault(_config);

var _http = __webpack_require__(9);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = __webpack_require__(10)('loris:server');


/**
 * Normalize a port into a number, string, or false.
 */

var normalizePort = function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

var onError = function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */

var onListening = function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
};

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || _config2.default.port.server);
_app2.default.set('port', port);

/**
 * Create HTTP server.
 */

var server = _http2.default.createServer(_app2.default);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(_config2.default.app.name + ' -> live on port: ' + _config2.default.port.server);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _httpErrors = __webpack_require__(2);

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _cookieParser = __webpack_require__(4);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = __webpack_require__(5);

var _morgan2 = _interopRequireDefault(_morgan);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

var _users = __webpack_require__(7);

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

app.use('/', _index2.default);
app.use('/users', _users2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, _httpErrors2.default)(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

module.exports = app;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("http-errors");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({ express: 'Hello From Express' });
});

router.get('/api/hello', function (req, res) {
    res.send({ express: 'Hello hi From Express' });
});

module.exports = router;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    app: {
        name: 'Loris',
        version: '0.0.1',
        info: 'Open Science Platform'
    },
    port: {
        server: 5000,
        socket: 5555
    },
    security: {
        log: {
            enabled: false,
            fileName: 'loris_log'
        },
        cookie: {
            secret: '63iVzNwvZu3AHwxAjAw2UD9CYyC22vGgbGK86mcAXUXvxWNj3C',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week cookie age.
        }
    },
    gcloud: {
        use: 'deployment',
        deployment: '/home/intralizee/Keys/intralizee.json',
        development: '/Users/intralizee/Development/Keys/intralizee.json'
    },
    database: {
        mysql: {
            use: 'development', // set to 'deployment' or 'development' to switch (development)
            deployment: '/home/intralizee/Keys/lilly_seed.json',
            development: '/Users/intralizee/Development/Keys/mysql/lilly_seed.json'
        },
        mongodb: {
            use: 'deployment', // set to 'deployment' or 'development' to switch (development)
            deployment: 'mongodb://alizee:2jrxt9Ti9VzUB3Gr3Avy@ds153380.mlab.com:53380/loris',
            development: 'mongodb://127.0.0.1:27017/loris'
        }
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ })
/******/ ]);