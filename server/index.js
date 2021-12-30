const express = require('express');
var app = express()

require('dotenv').config({path: './config.env'})
const dbo = require('./db/conn.js')
const cors = require('cors');
const port = process.env.PORT || 5000

app.use(cors);

app.get('/', function (req, res) {
    res.send('GET request to the homepage')        
});

app.listen(port, () => {
    dbo.connectToServer(function (err) {
            if (err) {
                console.error(err);
            }
        }); 
    console.log(`Server is running on port: ${port}`)
});