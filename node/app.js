const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
const port = 5092;

mongoose.connect('mongodb://127.0.0.1:27017/Blog').then(() => console.log('Database connected ...'));

app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded([extended = true]));

app.get('/', (req, res) => {
    res.send("amir");
})

app.listen(port, () => {
    console.log("listening on port", port);
})