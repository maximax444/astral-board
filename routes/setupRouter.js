const Router = require('express')
const router = new Router()
const options = require("../options")



router.post('/', (req, res) => {
    // ...
    // Suppose the user authentication is already done

    let { server, db, user, password } = req.body
    options.HOST = server
    options.DBNAME = db
    options.DBUSER = user
    options.DBPASSWORD = password
    options.TOKEN = user + db
    res.json("success!" + options.TOKEN);

});

module.exports = router