
const request = require('request');
const uuidv4 = require('uuid');
const { resourceKey, region, endpoint } = require('../config');

function getLanguages(){
    let options = {
        method: 'GET',
        baseUrl: endpoint,
        url: 'languages',
        qs: {
          'api-version': '3.0',
        },
        headers: {
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4.v4().toString()
        },
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
module.exports = getLanguages;