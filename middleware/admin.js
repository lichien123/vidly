module.exports = (req, res, next) => {
    if (!req.used.isAdmin) return res.status(403).send('access denied. not an admin');
    next();
};