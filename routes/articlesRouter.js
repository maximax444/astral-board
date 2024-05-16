const Router = require('express')
const router = new Router()

const articlesController = require('../controller/articlesController')
const authenticateToken = require('../config/token')

router.get('/', authenticateToken, articlesController.getAll)
router.post('/', authenticateToken, articlesController.create)
// router.post('/add', pagesController.create)

module.exports = router