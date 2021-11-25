const express = require('express');
const router = express.Router();

const MeController = require('./../app/controllers/MeController')

router.get('/stored/foods', MeController.storedFoods);
router.get('/trashed/foods', MeController.trashedFoods);


module.exports = router;