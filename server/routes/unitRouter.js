const express = require('express');
const router = express.Router();
const { UnitController } = require('../controllers');
const auth = require('../middleware/auth');

router.post('/createUnit', auth, UnitController.createUnit);
router.get('/getUnits', auth, UnitController.getUnits);
router.get('/getAllUnits',  UnitController.getAllUnits);
router.delete('/deleteunit/:unitid', UnitController.deleteUnitById);
router.get('/getSumUserUnits', auth, UnitController.getSumofUnitsById);
router.get('/getsumallunits', UnitController.getSumofAllUnits);
router.get('/getamount', UnitController.getAmountUnits);
module.exports = router;