const Router = require('express');
const router = new Router();

const blocksController = require('../controller/blocksController');
const authenticateToken = require('../config/token');

router.get('/', authenticateToken, blocksController.getAll);
router.post('/', authenticateToken, blocksController.create);
router.put('/', authenticateToken, blocksController.update);
router.get('/:blockId', authenticateToken, blocksController.getOne);
router.delete('/:blockId', authenticateToken, blocksController.delete);
router.get('/:blockId/fields', authenticateToken, blocksController.getFields);
router.put('/fields', authenticateToken, blocksController.updateFields);

module.exports = router;