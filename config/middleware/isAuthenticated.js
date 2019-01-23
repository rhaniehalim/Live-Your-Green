module.exports = function(req, res, next) {
    if (req.member) {
        return next();
    }

    return res.redirect("/");
}