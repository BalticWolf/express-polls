const base64 = require('js-base64').Base64;
const settings = require('./settings');

module.exports = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if(!authorization) throw new Error('Missing header authorization');

        const match = authorization.match(/^Basic (.+)$/);

        if (!match) throw new Error ('Invalid header authorization');

        const credentials = base64.decode(match[1]).split(':');

        if (credentials.length !== 2
            || credentials[0] !== settings.admin.username
            || credentials[1] !== settings.admin.password) {
            throw new Error('Incorrect username or password');
        }
        next();
    } catch(e) {
        res.setHeader('WWW-Authentificate', 'Basic realm="Restricted access"');
        res.status(401).send(e.message);
    }
};
