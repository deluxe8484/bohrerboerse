var express = require('express');
var router = express.Router();
var borrowController = require('../controllers/borrowController');

router.route('/')
    .get(borrowController.getAllBorrows)
    .post(borrowController.addBorrow);

router.route('/:id')
    .get(borrowController.getBorrow)
    .put(borrowController.updateBorrow)
    .delete(borrowController.deleteBorrow);

module.exports = router;