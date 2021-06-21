const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MDB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
       return console.error(err)
    } else {
        console.log('connected to DB')
    }
})


app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
});

