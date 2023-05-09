const express = require('express');
const app = express();
const config = require('./cfg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const MONGOURL = `mongodb://${config.database.HOST}:${config.database.PORT}/${config.database.DBNAME}`;
const jwt = require('jsonwebtoken');
const SECRET_TOKEN = config.jwt.TOKEN;

const UserRouter = require('./routes/userRouter');
const UnitRouter = require('./routes/unitRouter');
// const fetchuser = require('./middleware')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(config.host.PORT, () => {
    console.log('Server is started successfuly');
})


/* CONNECT TO MONGODB */
mongoose
    .connect(MONGOURL, {
        useNewUrlParser: true,
    })
    .then(() => console.log('Connected to DB successfully'))
    .catch(() => console.log('Cannot connect to DB'));

/* DATABASE MODELS */

app.use('/api/user', UserRouter);
app.use('/api/unit', UnitRouter);