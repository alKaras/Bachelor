require('dotenv').config();
module.exports = {
    "host": {
        PORT: 3001 || process.env.PORT,
    },
    "database": {
        HOST: '127.0.0.1',
        PORT: '27017',
        DBNAME: 'sumendb',
        URL: process.env.MONGODB,
    },
    "jwt": {
        TOKEN: 'asvasv7as7231hvsvas23as+*@#asfasfasgasdpwq[rspafasfklasiweqowe{Apssdfa[',
        EXPIRESIN: '30d'
    }
}