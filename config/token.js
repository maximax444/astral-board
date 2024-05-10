const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    // getting the authorization information
    const authHeader = req.headers['authorization'];
    // In our case It's JWT authantication
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // No token found;

    // verify if there is a user corrosponding to the token found in the 
    // authorization header.
    jwt.verify(token, "asdasadfdaasdafDAFSFD", (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403); // The token is there but it's not valid;
        // if the token is valid, i.e the user is present, then in the request we are 
        // attaching the user name, so that it can be used in other action controllers.
        req.user = user.name;
        // proceeding to the next action controller.
        next();
    })
}
module.exports = authenticateToken