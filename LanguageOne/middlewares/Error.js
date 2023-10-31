

/**
 * @param {string} message
 * @param {string} code
 * 
 * @returns {Error}
 * 
 */

function createError(message, code) {
    const error = new Error(message);
    error.code = code;
    return error;
}

module.exports = createError;

