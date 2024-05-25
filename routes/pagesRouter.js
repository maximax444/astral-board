const Router = require('express');
const router = new Router();

const pagesController = require('../controller/pagesController');
const authenticateToken = require('../config/token');

router.get('/', authenticateToken, pagesController.getAll);
router.get('/:id', authenticateToken, pagesController.getOne);
router.delete('/:pageId', authenticateToken, pagesController.delete);
router.post('/', authenticateToken, pagesController.create);
router.put('/', authenticateToken, pagesController.update);
// router.post('/add', pagesController.create)

module.exports = router;