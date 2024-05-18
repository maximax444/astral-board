const Router = require('express')
const router = new Router()

const usersRouter = require('./usersRouter')
const pagesRouter = require('./pagesRouter')
const articlesRouter = require('./articlesRouter')
const categoriesRouter = require('./categoriesRouter')
const settingsRouter = require('./settingsRouter')
const fieldsRouter = require('./fieldsRouter')
const blocksRouter = require('./blocksRouter')

router.use('/users', usersRouter)
router.use('/pages', pagesRouter)
router.use('/categories', categoriesRouter)
router.use('/articles', articlesRouter)
router.use('/settings', settingsRouter)
router.use('/fields', fieldsRouter)
router.use('/blocks', blocksRouter)

module.exports = router