const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/getUsers', UserController.getUsers);
router.delete('/deleteUser/:id', UserController.deleteUser);
module.exports = router;