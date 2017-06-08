module.exports = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if(!authorization) throw new Error('Missing header authorization');

        const match = authorization.match(/^Basic (.+)$/);

        if (!match) throw new Error ('Invalid header authorization');
        //= settings.admin.username + ':' + settings.admin.password;

        next();
    } catch(e) {
        res.status(401).send(e.message);
    }
};
