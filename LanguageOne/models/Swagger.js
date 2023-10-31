
let HOST = process.env.HOST || 'localhost';
let PORT = process.env.PORT || 8080;
const languages = require('../models/languages.json');

/**
 * Convert the languages.json file into an array of language codes
 */



let langs  = languages.translation
let scripts = languages.transliteration;

const getTranslitCodes =() => {
    let codes= []
    let translitCodes = Object.values(scripts).map((script) => {
        if (script.scripts) {
            return script.scripts.map((script) => {
                if(!codes.includes(script.code)) {
                codes.push(script.code);
                }
            });
            
        }

    });
    return codes;

}

const getTranslitNames =() => {
    let translitNames = Object.values(scripts).map((script) => {
        return script.scripts;
    });
    return translitNames;
}






const getLanguageCodes =() => {
let languageCodes = Object.keys(langs);
return languageCodes;
}

const getLanguageNames =() => {
    let languageNames = Object.values(langs);
    return languageNames;
}


const getLanguageName =(code) => {
    return langs[code].name;
}


const getLanguagNativeName =(code) => {
    return langs[code].nativeName;
}

const getLanguageCode =(name) => {
    let code = Object.keys(langs).find(key => langs[key].name === name);
    return code;
}

const swaggerDocument = {
    "swagger": "2.0",
    "info": {

        "title": "Translator Text API -Murtadha Marzouq, Ryan Hull, Scarlett Dong, Mohammad Arif, and Zhi Wang",
        "description": "This Api is a bridge between the Microsoft Translator Text API and the client. It is a RESTful API that uses HTTP requests to GET data and POST data. It is a self-documenting API that allows you to test the API calls directly from the browser.",
        "version": "1.2.0",
    
    },
    "host": "" + HOST + ":" + PORT,
    "basePath": "/API",
    "securityDefinitions": {
        "bearerAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    },

    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"],

    "paths": {
        "/languages": {
            "get": {
                "tags": ["Languages"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],


                "summary": "Returns the set of languages currently supported by the translation, transliteration, and dictionary methods. This request doesn't require authentication headers and you don't need a Translator resource to view the supported language set.",
                "description": "Returns the set of languages currently supported by the translation, transliteration, and dictionary methods. This request doesn't require authentication headers and you don't need a Translator resource to view the supported language set.",
                "operationId": "languages",
                "produces": ["application/json"],

                "parameters": [
                    {
                        "name": "scope",
                        "in": "query",


                        "description": "The scope of the language to return. Can be one of the following: \"translation\" - the language can be used as the source or target language \"transliteration\" - the language can be used as the source language for transliteration \"dictionary\" - the language can be used as the source language for dictionary lookup",
                        "required": true,
                        "type": "string",
                        "enum": ["translation", "transliteration", "dictionary"]
                    }

                ],


                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "$ref": "#/definitions/Languages"
                        }

                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {

                            "$ref": "#/components/responses/NotFound"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }


                },
                "default": {
                    "description": "Unexpected error",
                    "schema": {
                        "$ref": "#/definitions/Error"
                    }
                }


            }

        },
        "/translate": {
            "post": {
                "tags": ["Translate"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],

                "summary": "Translate specified source language text into the target language text.",
                "description": "Translate specified source language text into the target language text.",
                "operationId": "translate",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "text",
                        "in": "query",
                        "description": "The text to translate.",
                        "required": true,
                        "type": "string"
                    }, {
                        "name": "to",
                        "in": "query",
                        "description": `The language code for the language to translate the text into. For example, use "fr" for French\n\n.   for a complete list of valid language codes, see the Languages method.`
                        


         
                        ,
                        "required": true,
                        "enum":    getLanguageCodes(),
                    }, {
                        "name": "from",
                        "in": "query",
                        "description": "The language of the text to translate.",
                        "type": "enum",

                        "enum":  getLanguageCodes(),
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation"


                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {

                            "$ref": "#/definitions/Error"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    },
                    "403": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/Error"

                        }
                    }
                }
            }
        },

        "/detect": {
            "post": {
                "tags": ["Detect"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],

                "summary": "Identify the source language.",
                "description": "Identify the source language.",
                "operationId": "detect",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "text",
                        "in": "query",
                        "description": "The text to detect the language of.",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "$ref": "#/definitions/Detect"
                        }


                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {


                            "$ref": "#/definitions/Error"
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "object",
                            "properties": {

                                "message": {
                                    "type": "enum",
                                    "enum": ["Access denied due to missing subscription key. Make sure to include subscription key when making requests to an API."]
                                }
                            }

                        }
                    }

                }
            }
        },
        "/transliterate": {
            "post": {
                "tags": ["Transliterate"],
                "security": [
                    {
                        "bearerAuth": []
                    }

                ],

                "summary": "Transliterate text from one script to another.",

                "operationId": "transliterate",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "text",
                        "in": "query",
                        "description": "The text to transliterate.",
                        "required": true,
                        "type": "string"
                    }, {
                        "name": "language",
                        "in": "query",

                        "description": "The language code of the input text. For example, use \"hi\" for Hindi.\n\n.   for a complete list of valid language codes, see the Languages method.",
                        "required": true,
                        "enum":  getLanguageCodes()
                    }, {
                        "name": "fromScript",
                        "in": "query",

                        "type": "enum",
                        "enum":    ["Latn"],
                        "description": "The script of the input text. For example, use \"Latn\" for Latin script.\n\n.   for a complete list of valid script codes, see the Scripts method."
                    }, {

                        "name": "toScript",
                        "in": "query",

                        "enum":  getTranslitCodes(),   

                        "description": "The script to transliterate the text into. For example, use \"Latn\" for Latin script.\n\n.   for a complete list of valid script codes, see the Scripts method."
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                        }


                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {


                            "$ref": "#/definitions/Error"

                        }
                    },


                    "401": {
                        "description": "Unauthorized",
                        "schema": {
                            "type": "object",
                            "properties": {

                                "message": {
                                    "type": "enum",

                                    "enum": ["Access denied due to missing subscription key. Make sure to include subscription key when making requests to an API."]
                                }
                            }

                        }
                    }
                }
            }
        },



        "/dictionary": {
            "post": {
                "tags": ["DictionaryLookup"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],

                "summary": "Returns alternatives for single word translations.",
                "description": "Returns alternatives for single word translations.",
                "operationId": "dictionary/lookup",

                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "text",
                        "in": "query",

                        "description": "The text to detect the language of.",
                        "required": true,
                        "type": "string"
                    }, {
                        "name": "from",
                        "in": "query",
                        "description": "The language of the text to translate.",
                        "required": true,

                        "type": "array",
                        "items": {  
                            "type": "string",
                            "enum":  getLanguageCodes()
                        }
                    }, {
                        "name": "to",
                        "in": "query",

                        "description": "The language to translate the text into.",
                        "required": true,
                        "type": "string",
                        "enum":   getLanguageCodes()
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "$ref": "#/definitions/DictionaryLookup"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }

                    },
                    "403": {
                        "description": "Unauthorized",
                        "schema": {
                            "$ref": "#/definitions/Error"

                        }
                    }
                }
            }

        }
    },
 
    "components": {
        "responses": {
            "Unauthorized": {
                "description": "Unauthorized"

            },
            "NotFound": {
                "description": "Not Found",
                "schema": {
                    "$ref": "#/definitions/Error"
                }
            },
            "BadRequest": {
                "description": "Bad Request",
                "schema": {
                    "$ref": "#/definitions/Error"
                }
            }
        }

    },

    "definitions": {

        "Language": {
            "type": "object",
            "properties": {
                "name": {

                    "type": "string"
                },
                "nativeName": {
                    "type": "string"
                },
                "code": {
                    "type": "string"
                }
            }
        },


        "Error": {
            "type": "object",
            "properties": {
                "statusCode": {
                    "type": "integer",
                    "format": "int32",
                    "enum": [
                        400,
                        401,
                        403,
                        429,
                        500
                    ]
                },


                "message": {

                    "type": "string",
                    "enum": [
                        "Invalid request",
                        "Invalid credentials",
                        "Unauthorized",
                        "Too many requests",
                        "Internal error"
                    ]
                }
            }
        },

        "Languages": {
            "type": "object",
            "properties": {
                
                "language": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Language"

                    }}
                }
        },
        "Detect": {
            "type": "object",
            "properties": {
                "language": {

                    "type": "string",
                    "enum": [
                        "ar",
                        "bg",
                        "de",
                        "el",
                        "en",
                        "es",
                        "fr",
                        "it",
                        "ja",
                        "ko",
                        "nl",
                        "pl",
                        "pt",
                        "ro",
                        "ru",
                        "sk",
                        "sl",
                        "sv",
                        "tr",
                        "zh-Hans",
                        "zh-Hant"
                    ]
                },
                "score": {
                    "type": "number"

                }
            }
        },

        "DictionaryLookup": {
            "type": "object",
            "properties": {
                "normalizedSource": {

                    "type": "string"

                },
                "displaySource": {
                    "type": "string"
                },
                "translations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "normalizedTarget": {
                                "type": "string"
                            },
                            "displayTarget": {
                                "type": "string"
                            },

                            "posTag": {
                                "type": "string"
                            },
                            "confidence": {
                                "type": "number"


                            }
                        }
                    }
                }
            }
        }


    }


}


module.exports = swaggerDocument;
