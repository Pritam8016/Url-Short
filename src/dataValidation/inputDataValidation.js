// const mongoose = require('mongoose')
var validUrl = require('valid-url');
  


/** 
 * @param {string} value: bodyData validation function.
 */

const isValid = (value)=> {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length > 0) return true; 
};

// const isValids = (value)=> {
//     if (typeof value == "undefined" || value == null) return false;
//     if (typeof value == "number") return true;
// };

const isValidRequestBody = function (object) {
    return Object.keys(object).length > 0;
};

whitespace = (value)=>{
    return value.indexOf(" ") >= 0 
}

// All input data validation

/**
 * @param {string} value: bodyData
 */

const isValidRequest = (value) => {
    // if body empty
    if (!isValidRequestBody(value)) {
        return "data is required";
    }
}

/**
 * @param {string} value: longUrl
 */

 const isValidLongUrl = (value) => {

    if (!isValid(value)) {
        return "longUrl is required and string"
    }
    
    if (whitespace(value)) {
        return "Make sure longUrl should not have space." //&& whitespace(name)
    }

    let data = validUrl.isUri(value)
    if (!data) {
        return `please enter valid longUrl`
    }

}



module.exports = {isValidRequest, isValidLongUrl}