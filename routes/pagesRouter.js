const Router = require('express');
const router = new Router();

const pagesController = require('../controller/pagesController');
const authenticateToken = require('../config/token');

router.get('/', authenticateToken, pagesController.getAll);
router.get('/:id', authenticateToken, pagesController.getOne);
router.post('/', authenticateToken, pagesController.create);
// router.post('/add', pagesController.create)

module.exports = router;