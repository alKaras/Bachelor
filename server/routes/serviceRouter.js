const express = require('express');
const router = express.Router();
const { ServiceController } = require('../controllers');
const auth = require('../middleware/auth');

router.post('/createService', auth, ServiceController.createService);
router.get('/getUserService', auth, ServiceController.getServById);
router.get('/getServices', ServiceController.getServices);
router.put('/updateStatus/:servid', ServiceController.updateStatusServ);

module.exports = router;