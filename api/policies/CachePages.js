module.exports = function(req, res, next) {
  res.header({ "Cache-Control": "public, max-age=600" });
  next();
};
