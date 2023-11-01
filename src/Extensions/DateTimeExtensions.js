const dateTimeFormat = require('date-and-time');

class DateTimeExtensions {
    DateTimeStringFormat = "YYYY-MM-DD HH:mm:ss"

    DateTimeNow(){
        return dateTimeFormat.format(
            new Date(), this.DateTimeStringFormat
        )
    }

    ParseDateTime(datetime) {
        return dateTimeFormat.format(
            new Date(datetime * 1000), this.DateTimeStringFormat
        )
    }
}

module.exports = DateTimeExtensions;
