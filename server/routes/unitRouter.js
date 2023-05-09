const express = require('express');
const router = express.Router();
const { UnitController } = require('../controllers');
const fetchuser = require('../middleware')

router.post('/createUnit', UnitController.createUnit);
router.get('/getUnits', UnitController.getUnits);

module.exports = router;