var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.addUser);

router.route('/byName')
    .get(userController.filterByName);

router.route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;