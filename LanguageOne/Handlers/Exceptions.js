const exception = class {

    constructor(errCode, text, diagnostics) {
        if(errCode === Object(errCode)) {
            this.text = errCode.text?errCode.text:'';
            this.errCode = errCode.errCode?errCode.errCode:99;
        } else {
            this.text = text?text:'';
            this.errCode = errCode?errCode:99;
        }

        this.diagnostics = diagnostics
    }
};

module.exports = exception;