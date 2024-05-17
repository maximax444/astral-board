const Router = require('express')
const router = new Router()


const multer = require("multer");
const upload = multer({ dest: "uploads/" })

const articlesController = require('../controller/articlesController')
const authenticateToken = require('../config/token')

router.get('/', authenticateToken, articlesController.getAll)
router.post('/', authenticateToken, upload.single("file"), articlesController.create)
// router.post('/add', pagesController.create)

module.exports = router