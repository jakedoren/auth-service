const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

mongoose.connect(process.env.MDB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
       return console.error(err)
    } else {
        console.log('connected to DB')
    }
});

app.use('/auth', require('./routers/userRouter'))
app.use('/note', require('./routers/noteRouter'))

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
});

