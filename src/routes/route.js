const express = require('express');
const router = express.Router();
const urlController = require('../controllers/UrlController');

//--------------------------> (This is test api ) <-------------------------------------//

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


//================================( All Url api)====================================//

//When shorten a url, call this api

router.post("/url/shorten", urlController.CreateUrl) 

//When render Url,  call this api

router.get("/:urlCode", urlController.renderUrl)



// router.all("/**",  (req, res) => {
//     return res.status(400).send({ status: false, msg: "Invalid api." })
// });



module.exports = router;
