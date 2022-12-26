const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');


router.get('', chartController.getIndex);

module.exports = router;