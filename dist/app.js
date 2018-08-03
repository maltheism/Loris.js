'use strict';

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSocket = require('express-socket.io-session');

var _expressSocket2 = _interopRequireDefault(_expressSocket);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoStore = require('connect-mongo')(_expressSession2.default);

var app = (0, _express2.default)();
app.use((0, _helmet2.default)());

var server = require('http').Server(app);
var io = require('socket.io')(server); // add socket.io 'websockets'.
server.listen(_config2.default.port.socket); // listen for websockets on port 6660

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

//-| session |--------|
var session = (0, _expressSession2.default)({
    secret: _config2.default.security.cookie.secret,
    clear_interval: 3600,
    cookie: { // cookie stuff.
        maxAge: _config2.default.security.cookie.maxAge
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: _config2.default.database.mongodb.use === 'deployment' ? _config2.default.database.mongodb.deployment : _config2.default.database.mongodb.development,
        ttl: 7 * 24 * 60 * 60 // 7 days.
    })
});

app.use(session);

io.use((0, _expressSocket2.default)(session, {
    autoSave: true
}));

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

//-| Socket.io Commands |-- -- -- -- -- -- -- -- -- [SEPARATOR] -|
io.on('connection', function (socket) {
    console.log('[*] Websocket connection found!' + '\n');

    var client = require('./libraries/client/client');
    client.socketHandler(socket);
    /* socketHandler [events] list.
     *   'client_identity' 'client_register' 'disconnect' 'message' 'error'
     *   'client_ready' 'client_error'
     */

    var user = require('./libraries/user/user');
    user.socketHandler(socket);
    /* socketHandler [events] list.
     *   'login'
     *   'logout'
     *   'register'
     *   'get_avatar'
     *   'update_avatar'
     *   'create_lyrics_transcription_request'
     */
});

module.exports = app;
//# sourceMappingURL=app.js.map