const isValidUserData = require('../dataValidation/inputDataValidation');
const urlModel = require("../Models/urlModel");
const shortId = require("shortid");
require('dotenv').config();
const { SET_ASYNC, GET_ASYNC } = require("../redis");
const {baseUrl} = require('../config/keys')
//========================================>  (( Create a url api call )) <==================================//


const CreateUrl = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        // using destructuring of body data.
        const { longUrl } = req.body;

        if (!longUrl)
            return res.status(400).send("please enter longUrl for shorting");

        //Input data validation
        let msgUserData = isValidUserData.isValidRequest(req.body) //isValidLongUrl
        if (msgUserData) {
            return res.status(400).send({ status: false, message: msgUserData })
        }

        let msgLongUrlData = isValidUserData.isValidLongUrl(longUrl)
        if (msgLongUrlData) {
            return res.status(400).send({ status: false, message: msgLongUrlData })
        }

        // let url = await urlModel.findOne({ longUrl }).select({ urlCode: 1, longUrl: 1, shortUrl: 1, _id: 0 })

        let cahcedProfileData = await GET_ASYNC(`${longUrl}`);
        cahcedProfileData = JSON.parse(cahcedProfileData) 

        if (cahcedProfileData) {
            return res.status(201).send({ status: true, message: "Already exists...", data: cahcedProfileData });
        }

        // create url code
        let urlCode = shortId.generate().toLowerCase();
        let shortUrl = baseUrl + urlCode;

        let savedData = {
            urlCode: urlCode,
            longUrl: longUrl,
            shortUrl: shortUrl
        }
        await urlModel.create(savedData);
        await SET_ASYNC(`${longUrl}`, JSON.stringify(savedData), "Ex", 6000);
        return res.status(201).send({ status: true, message: "Saving new record...", data: savedData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//========================================>  (( Render Url , api call )) <==================================//


const renderUrl = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        const code = req.params.urlCode

        //find urlCode
        let cahcedProfileData = await GET_ASYNC(`${code}`);
        cahcedProfileData = JSON.parse(cahcedProfileData)

        if (cahcedProfileData) {
            return res.status(302).redirect(cahcedProfileData.longUrl);

        }
        const url = await urlModel.findOne({ urlCode: code });
        if (!url) {
            return res.status(404).send({ message: "No url found" });
        }

        await SET_ASYNC(`${code}`, JSON.stringify(url), "Ex", 6000);
        console.log("Long url found for short url. Redirecting...");
        return res.status(302).redirect(url.longUrl);


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { CreateUrl, renderUrl }