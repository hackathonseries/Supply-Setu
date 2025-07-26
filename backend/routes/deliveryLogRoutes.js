const express = require('express');
const router = express.Router();
const deliveryLogController = require('../controllers/deliveryLogController');

router.post('/create', deliveryLogController.createInitialLog);
router.put('/:surplusPostId/update', deliveryLogController.addDeliveryUpdate);
router.get('/:surplusPostId', deliveryLogController.getDeliveryLog);

module.exports = router;