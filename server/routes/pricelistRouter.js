const express = require('express');
const router = express.Router();
const { PricesController } = require('../controllers');

router.post('/createlist', PricesController.createPriceList);
router.get('/getpricelist', PricesController.getPriceList);

module.exports = router;