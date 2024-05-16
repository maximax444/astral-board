const Router = require('express')
const router = new Router()

const usersRouter = require('./usersRouter')
const pagesRouter = require('./pagesRouter')
const articlesRouter = require('./articlesRouter')
const categoriesRouter = require('./categoriesRouter')
router.use('/users', usersRouter)
router.use('/pages', pagesRouter)
router.use('/categories', categoriesRouter)
router.use('/articles', articlesRouter)

module.exports = router