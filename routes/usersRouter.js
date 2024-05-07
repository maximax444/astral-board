const Router = require('express')
const router = new Router()

const usersController = require('../controller/usersController')

router.get('/', usersController.getAll)
router.post('/add', usersController.create)

module.exports = router