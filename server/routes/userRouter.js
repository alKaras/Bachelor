const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');
const auth = require('../middleware/auth')
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/getUsers', UserController.getUsers);
router.get('/getUser', auth, UserController.getUser);
router.delete('/deleteuser/:id', UserController.deleteUser);
module.exports = router;