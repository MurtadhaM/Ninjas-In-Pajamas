const scopes = ['translation', 'transliteration', 'dictionary'];
const languageCodes = [
    'af',
    'ar',
    'bn',
    'bs',
    'bg',
    'yue',
    'ca',
    'zh-Hans',
    'zh-Hant',
    'hr',
    'cs',
    'da',
    'nl',
    'en',
    'et',
    'fj',
    'fil',
    'fi',
    'fr',
    'de',
    'el',
    'ht',
    'he',
    'hi',
    'mww',
    'hu',
    'is',
    'id',
    'it',
    'ja',
    'sw',
    'tlh',
    'tlh-Qaak',
    'ko',
    'lv',
    'lt',
    'mg',
    'ms',
    'mt',
    'nb',
    'fa',
    'pl',
    'pt',
    'otq',
    'ro',
    'ru',
    'sm',
    'sr-Cyrl',
    'sr-Latn',
    'sk',
    'sl',
    'es',
    'sv',
    'ty',
    'ta',
    'te',
    'th',
    'to',
    'tr',
    'uk',
    'ur',
    'vi',
    'cy',
    'yua'
]
const NEWLINE = require('os').EOL;
const ANY_NEWLINE = /\r\n|\r|\n/g;

const sanitizeText = (text) => {
    return text.replace(ANY_NEWLINE, NEWLINE);
}

const validateScope = (req, res, next) => {

    const scope = req.body.scope || req.query.scope;

    if (scope) {

        if (scopes.includes(scope)) {
            next();
        } else {
            let err = new Error('invalid scope');
            err.status = 400;
            next(err);
        }

    }
}


const validateText = (req, res, next) => {

    const text = req.body.text || req.query.text;

    console.log(text);
    if (text) {
        /**
         * Clean up the text and check length
         */
        if (text.length > 0 && text.length < 5000) {
            next();
        } else {
            let err = new Error('invalid text');
            err.status = 400;
            next(err);
        }
    } else {
        let err = new Error(' text is required');
        err.status = 400;
        next(err);
    }

}
const validateFromTo = (req, res, next) => {


    const to = req.body.to || req.query.to;
    const from = req.body.from || req.query.from;

    if (to && from) {
        /**
         * Validate that the from and to parameters are valid language codes
         */
            if (languageCodes.includes(to) && languageCodes.includes(from)) {

                next();
            } else {
                let err = new Error('invalid language code');
                err.status = 400;
                next(err);

            }

        
    } else {

        let err = new Error('Bad Request');
        err.status = 400;
        next(err);
    }

}

exports.validateScope = validateScope;
exports.validateFromTo = validateFromTo;
exports.validateText = validateText;
exports.sanitizeText = sanitizeText;
