module.exports = function(req, res, next) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
}