
const request = require('request');
const uuidv4 = require('uuid');
const { resourceKey, region, endpoint } = require('../config');


 function translateText(Text, toLanguage,fromLanguage){

     
        let options = {
            method: 'POST',
            baseUrl: endpoint,
            url: 'translate',
            qs: {

                'api-version': '3.0',
                'to': toLanguage,
                'from': fromLanguage
            },
            headers: {

                'Ocp-Apim-Subscription-Key': resourceKey,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json',

                'X-ClientTraceId': uuidv4.v4().toString()
            },
            body: [{
                'text':  Text,
              
          }],
          json: true,
          
        };    
        
        
        return new Promise((resolve, reject) => {
            request(options, function(err, res, body){
                if(err){
                    reject(err);
                }
                else{
                    resolve(body);
                }
          
            });
        }
        );
    }




module.exports = translateText;