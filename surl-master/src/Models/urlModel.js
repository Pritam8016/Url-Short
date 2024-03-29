//{ urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }

const mongoose = require("mongoose")
const UrlSchema = new mongoose.Schema({
    urlCode: {
        type : String,
        required : true,
        unique : true, 
        lowercase: true, 
        trim : true 
    },
    longUrl: {
        type : String,
        required : true,
        unique : true, 
        lowercase: true, 
        trim : true 
    },
    shortUrl: {
        type : String,
        required : true,
        trim: true
    }

}, {timestamps : true})


module.exports = mongoose.model("urlModel", UrlSchema)