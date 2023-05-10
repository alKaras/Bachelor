const express = require('express');
const router = express.Router();
const { UnitController } = require('../controllers');
const auth = require('../middleware/auth');

router.post('/createUnit', auth, UnitController.createUnit);
router.get('/getUnits', auth, UnitController.getUnits);

module.exports = router;