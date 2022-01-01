const express = require('express');
const cors = require('cors');
require('dotenv').config({path: './config.env'})

const dbo = require('./db/conn.js')

const port = process.env.PORT || 5000
var app = express()

app.use(cors())
app.use(express.json())
app.use(require('./routes/record'))

app.get('/', (_req, res) => {
    res.send('GET request to the homepage')        
})

app.listen(port, () => {
    dbo.connectToServer(function (err) {
            if (err) {
                console.error(err);
            }
        });
    console.log(`Server is running on port: ${port}`)
})