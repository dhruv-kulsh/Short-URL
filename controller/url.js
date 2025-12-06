const { nanoid } = require("nanoid");
const URL = require("../models/url")

async function handleGenerateNewShortURL(req, res) {
    //   console.log("BODY RECEIVED:", req.body);
    const body = req.body;
    if (!body.redirectURL) return res.status(400).json({ error: 'URL is required' })
    const shortId = nanoid(8);
    await URL.create(
        {
            shortId: shortId,
            redirectURL: body.redirectURL,
            visitHistory: [],
            createdBy: req.user._id
        }
    )
    // return res.status(201).json({id:shortId});
    return res.render("home", {
        id: shortId
    })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) return res.status(404).json({ error: "Short URL not found" });
    
    // // Check if the user owns this URL
    // if (result.createdBy.toString() !== req.user._id.toString()) {
    //     return res.status(403).json({ error: "Unauthorized - You can only view your own analytics" });
    // }
    
    return res.status(200).json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}