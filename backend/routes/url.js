const express = require("express")
const router = express.Router();
const {handlegenrateshorturl, handlegetanalytics} = require("../controllers/url")

router.post("/",handlegenrateshorturl)

router.get("/analytics/:shortId",handlegetanalytics)

module.exports =router;