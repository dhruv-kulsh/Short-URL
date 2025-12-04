const express = require("express")
const {handleGenerateNewShortURL, handleGetAnalytics} = require("../controller/url")

const router = express.Router();

router.route('/').post(handleGenerateNewShortURL);
// router.post('/',handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router