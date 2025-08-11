const URL = require("../models/url");
const shortid = require('shortid');

async function handlegenrateshorturl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'
    })
    const shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
    })

    return res.json({id:shortID});
}

async function handlegetanalytics(req, res) {
     console.log("Params:", req.params);

    const shortId = req.params.shortId; // make sure this matches the route param name exactly
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalclicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports={
    handlegenrateshorturl,
    handlegetanalytics,
}