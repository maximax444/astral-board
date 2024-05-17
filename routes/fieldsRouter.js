const Router = require('express')
const router = new Router()

const fieldsController = require('../controller/fieldsController')
const authenticateToken = require('../config/token')

router.get('/', authenticateToken, fieldsController.getAll)
router.post('/', authenticateToken, fieldsController.create)

module.exports = router