
const request = require('request');
const uuidv4 = require('uuid');
const { resourceKey, region, endpoint } = require('../config');

function detectLanguage(text){
    let options = {
        method: 'POST',
        baseUrl: endpoint,
        url: 'detect',
        qs: {
          'api-version': '3.0',
        },
        headers: {
          'Ocp-Apim-Subscription-Key': resourceKey,
          'Ocp-Apim-Subscription-Region': region,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4.v4().toString()
        },
        body: [{
              'text':  text
        }],
        json: true,
    };

     /**
     * Promise based HTTP client for the browser and node.js
     */
    return new Promise((resolve, reject) => {
        request(options, function(err, res, body){
            if(err){
                reject(err);
            }
            else{
                resolve(body);
            }      
        });
    });
};

module.exports = detectLanguage;
