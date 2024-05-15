const Router = require('express')
const router = new Router()

const usersRouter = require('./usersRouter')
const pagesRouter = require('./pagesRouter')
router.use('/users', usersRouter)
router.use('/pages', pagesRouter)

module.exports = router