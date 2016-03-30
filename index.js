var express = require('express'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    app = express();

var PORT = process.env.PORT || 3232;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/app/public'));

var routes = require('./routes')(express.Router());
app.use('/', routes);

app.listen(PORT, function () {
  console.log('server listening on localhost:' + PORT);
})