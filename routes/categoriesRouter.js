const Router = require('express');
const router = new Router();

const categoriesController = require('../controller/categoriesController');
const authenticateToken = require('../config/token');

router.get('/', authenticateToken, categoriesController.getAll);
router.post('/', authenticateToken, categoriesController.create);
router.put('/', authenticateToken, categoriesController.update);
router.delete('/:catId', authenticateToken, categoriesController.delete);
// router.post('/add', pagesController.create)

module.exports = router;