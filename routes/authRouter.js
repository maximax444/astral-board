const jwt = require('jsonwebtoken');
const Router = require('express')
const router = new Router()
const options = require("../options")




const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
}


router.post('/', (req, res) => {
    // ...
    // Suppose the user authentication is already done

    let { email, password } = req.body
    const user = { name: email };
    const accessToken = generateAccessToken(user);
    res.json(accessToken);

});

module.exports = router