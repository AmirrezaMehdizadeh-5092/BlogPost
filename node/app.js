const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const app = express();
const port = 5092;

mongoose.connect('mongodb://127.0.0.1:27017/Blog').then(() => console.log('Database connected ...'));

const User = require("./model/user");

app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded([extended = true]));

app.get('/', (req, res) => {
    res.send("sd")
})

app.post('/register', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    Cpassword = req.body.Cpassword;
    if (username && password && Cpassword) {
        if (password == Cpassword) {
            findUser = await User.findOne({ username : username });
            if (findUser) {
                return res.send("چنین نام کاربری وجود دارد")
            }
            else {
                let hash = bcrypt.hashSync(password, 8);
                let NewUser = new User({
                    username,
                    password: hash,
                    role: "user"
                })
                NewUser.save().then(() => {
                    res.status(200).send("ثبت نام موفقیت آمیز بود")
                })
            }
        }
        else {
            return res.send("password")
        }
    }
    else {
        return res.send("fill")
    }
})

app.post("/login" , )

app.listen(port, () => {
    console.log("listening on port", port);
})