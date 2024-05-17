const Router = require('express')
const router = new Router()

const settingsController = require('../controller/settingsController')
const authenticateToken = require('../config/token')

router.get('/', authenticateToken, settingsController.getAll)
router.post('/', authenticateToken, settingsController.create)
router.put('/', authenticateToken, settingsController.update)

module.exports = router