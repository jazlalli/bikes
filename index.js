import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import routeConfig from 'app/routes';

const app = express();
const PORT = process.env.PORT || 3232;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/app/public'));

const routes = routeConfig(express.Router());
app.use('/', routes);

app.listen(PORT, () => console.log('server listening on localhost:' + PORT));
