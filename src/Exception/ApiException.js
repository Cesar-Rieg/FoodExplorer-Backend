const HttpStatusCode = require("../HttpStatusCode/HttpStatusCode.js");

class ApiException {
    Message;
    StatusCode;

    constructor(Message, StatusCode = HttpStatusCode.BadRequest){
        this.Message = Message;
        this.StatusCode = StatusCode;
    }
}

module.exports = ApiException;