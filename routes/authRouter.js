
const Router = require('express')
const router = new Router()

const usersController = require('../controller/usersController')






router.post('/', usersController.login)


module.exports = router