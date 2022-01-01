const express = require('express')
const dbo = require('../db/conn.js')
const ObjectId = require("mongodb").ObjectId

const recordRoutes = express.Router()

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("roots")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, res) {
    let db_connect = dbo.getDb();
    let body =  req.body
    db_connect
        .collection("roots")
        .insertOne(body, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

module.exports = recordRoutes