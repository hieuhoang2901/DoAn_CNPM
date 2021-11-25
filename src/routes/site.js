const express = require('express');
const router = express.Router();

const siteController = require('./../app/controllers/SiteController')

router.get('/', siteController.home);
router.post('/', siteController.redirect_to_search);
router.get('/search/:data', siteController.search);

module.exports = router;