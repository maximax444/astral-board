const Router = require('express')
const router = new Router()

const fieldsController = require('../controller/fieldsController')
const authenticateToken = require('../config/token')

router.get('/', authenticateToken, fieldsController.getAll)
router.post('/', authenticateToken, fieldsController.create)
router.put('/', authenticateToken, fieldsController.update)
router.get('/:fieldId', authenticateToken, fieldsController.getOne)
router.delete('/:fieldId', authenticateToken, fieldsController.delete)

module.exports = router