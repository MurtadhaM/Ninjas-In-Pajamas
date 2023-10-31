const Translate = require('../Handlers/Translate');
const Languages = require('../Handlers/Languages');
const DictionaryLookup = require('../Handlers/DictionaryLookup');
const dictionaryExamples = require('../Handlers/DictionaryExamples');
const Detect = require('../Handlers/Detect');
const BreakSentence = require('../Handlers/BreakSentence');
const Transliterate = require('../Handlers/Transliterate');
const translateText = require('../Handlers/Translate');
const sanitizeText = require('../middlewares/validator').sanitizeText;


exports.translate = (req, res, next) => {

    let text = req.body.text || req.query.text;
    const to = req.body.to || req.query.to;
    const from = req.body.from || req.query.from;

    if (text) { /**
         * Clean up the text 
         *  */
        // 1. sanitize text
        let result = Translate(text, to, from)

        result.then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            next(err);
        });
        



    } else {
        let err = new Error('Text is required');
        console.log(text);

        err.status = 400;
        next(err);
    }
}


exports.languages = (req, res, next) => {

    const scope = req.body.scope || req.query.scope;


    if (scope) {
        let result = Languages(scope);

        result.then((result) => {
            res.status(200).json(result);
        });

    } else {
        let err = new Error('Bad Request');
        err.status = 400;
        next(err);
    }

}

exports.dictionaryLookup = (req, res, next) => {
    let text = req.body.text || req.query.text;
    const to = req.body.to || req.query.to;
    const from = req.body.from || req.query.from;

    if (text && from) { /**
         * Clean up the text 
         *  */
        text = sanitizeText(text);
        let result = DictionaryLookup(text, from, to);
        result.then((result) => {
            res.status(200).json(result);
        });
    } else {
        let err = new Error('Bad Request');
        err.status = 400;
        next(err);
    }

}


exports.Detect = (req, res, next) => {

    let text = req.body.text || req.query.text;
    if (text) { /**
         * Clean up the text 
         *  */
        text = sanitizeText(text);
        let result = Detect(text);
        result.then((result) => {
            res.status(200).json(result);
        });
    } else {
        let err = new Error('Bad Request');
        err.status = 400;
        next(err);
    }
}

exports.transliterateText = (req, res, next) => {
    
        let text = req.body.text || req.query.text;
        const fromScript = req.body.from || req.query.fromScript;
        const language = req.body.to || req.query.language;
        const toScript = req.body.to || req.query.toScript;
        
        console.log("Transliterate.js: transliterateText: language: " + language);
        console.log("Transliterate.js: transliterateText: fromScript: " + fromScript);
        console.log("Transliterate.js: transliterateText: toScript: " + toScript);
        console.log("Transliterate.js: transliterateText: text: " + text);
    
        if (    text &&  language ) { /**
            * Clean up the text 
            *  */
            text = sanitizeText(text);
            let result =  Transliterate.transliterateText( language, fromScript, toScript, text   );
            result.then((result) => {
                res.status(200).json(result);
            });
        } else {
            let err = new Error('Bad Request');
            err.status = 400;
            next(err);
        }
    }

    

