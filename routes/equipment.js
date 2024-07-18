var express = require('express');
var router = express.Router();
var equipmentController = require('../controllers/equipmentController');

router.route('/')
    .get(equipmentController.getAllEquipment)
    .post(equipmentController.addEquipment);

router.route('/:id')
    .get(equipmentController.getEquipment)
    .put(equipmentController.updateEquipment)
    .delete(equipmentController.deleteEquipment);

module.exports = router;