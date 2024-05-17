const Router = require('express')
const router = new Router()

const blocksController = require('../controller/blocksController')
const authenticateToken = require('../config/token')

router.get('/', authenticateToken, blocksController.getAll)
router.post('/', authenticateToken, blocksController.create)

module.exports = router