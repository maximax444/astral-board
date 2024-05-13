const Router = require('express')
const router = new Router()

const usersController = require('../controller/usersController')
const authenticateToken = require('../config/token')

router.get('/', authenticateToken, usersController.getAll)
router.post('/add', usersController.create)

module.exports = router