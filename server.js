var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express(),
    proxy = require('http-proxy-middleware');

var HOSTNAME = 'localhost',
    PORT = 8000,
    PUBLIC_DIR = __dirname + '/public_html';

var count = 0;

app.use(function (req, res, next) {
    // Здесь нужно написать журналирование в формате
    // (журналирование - вывод в консоль)
    // [время] [номер запроса по счету]
    console.log('[%s] [%s]', (new Date()).toLocaleString(), count++);
    next();
});

app
    .use('/', express.static(PUBLIC_DIR))
    .use(errorHandler());

app.listen(PORT, function () {
    console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

app.use('/api', proxy('http://127.0.0.1:8080/', {ws: true}));
