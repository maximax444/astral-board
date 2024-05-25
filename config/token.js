const jwt = require('jsonwebtoken');
const options = require("../options");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); 

    jwt.verify(token, options.TOKEN, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user.name;
        next();
    });
};
module.exports = authenticateToken;