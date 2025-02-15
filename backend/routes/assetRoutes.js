const express = require('express');
const router = express.Router();
const { getAssets } = require('../controllers/assetController');

router.get('/', getAssets);

module.exports = router;