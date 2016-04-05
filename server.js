import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { routes } from './app/routes';

const app = express();
const PORT = process.env.PORT || 3232;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic(__dirname + '/dist/'));

const inject = markup => {
  const doc = fs.readFileSync(
    __dirname + '/views/index.html', {encoding: 'utf8'}
  );

  return doc.replace(/#content/ig, markup);
}

const routeHandler = (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      const markup = renderToString(<RouterContext {...props} />);
      const payload = inject(markup);
      res.end(payload);
    } else {
      res.sendStatus(404);
    }
  });
}

app.get('*', routeHandler);

app.listen(PORT, () => console.log('listening on localhost:' + PORT));
