

module.exports = function requiresManager(req, res, next) {
    if (req.user.permission === 'Manager') {
        return next();
    } else {
        res.send('you do not have permission');
    }
};
