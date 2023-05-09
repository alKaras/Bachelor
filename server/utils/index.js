const moment = require('moment');

const dateFormat = (date) => {
    const pdate = moment(date).locale('uk');
    const _date = pdate.format('YYYY-MM-DD');

    return _date;
}

module.exports = {
    dateFormat
}