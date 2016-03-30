function routeHandler(req, res, next) {
  var content = React.renderToString(<Handler />, null);
  var data = { bikes: result[0] };
  // var html = inject(content, data);
  res.end(html);
}

module.exports = function (router) {
  router.route('/*').get(routeHandler);
  return router;
}