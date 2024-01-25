const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const app = express();
const port = 5092;
const secret = "amir"

mongoose.connect('mongodb://127.0.0.1:27017/Blog').then(() => console.log('Database connected ...'));

const User = require("./model/user");
const Article = require("./model/article");

app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded([extended = true]));

app.get("/get_article", async (req, res) => {
    articles = await Article.aggregate(
        [
            { $sort: { joinDate: 1 } }
        ]
    )
    res.send(articles)
})

app.post("/token", async (req, res) => {
    token = req.body.token;
    let decoded = jwt.verify(token, secret);
    res.send(decoded.username);
})

app.post('/register', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    Cpassword = req.body.Cpassword;
    if (username && password && Cpassword) {
        if (password == Cpassword) {
            findUser = await User.findOne({ username: username });
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

app.post("/login", async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    console.log(username, password)
    find = await User.findOne({ username: username });
    if (find) {
        const comp_pass = bcrypt.compareSync(password, find.password);
        if (!comp_pass) {
            return res.send("password");
        }
        else {
            const token = jwt.sign({ username: find.username }, secret, {
                algorithm: "HS256",
            });
            res.status(200).send(token);
        }
    }
    else {
        return res.send("notFound")
    }
})

app.post('/add_article', async (req, res) => {
    rand = Math.floor(Math.random() * 101) + 100;
    user_id = req.body.user_id;
    art_id = user_id + rand;
    subject = req.body.subject;
    description = req.body.description;
    text = req.body.text;

    let NewArticle = new Article({
        art_id,
        user_id,
        subject,
        description,
        text
    })
    NewArticle.save().then(() => {
        res.send("success")
    })
})

app.post('/articles', async (req, res) => {
    userid = req.body.userid;
    articles = await Article.find({ user_id: userid });
    res.send(articles)
})

app.post("/del_article", async (req, res) => {
    art_id = req.body.art_id;
    await Article.deleteOne({ art_id });
    res.send('مقاله با موفقیت حذف شد');
})

app.post("/edit_article", async (req, res) => {
    art_id = req.body.art_id;
    new_description = req.body.new_description;
    new_text = req.body.new_text;
    await Article.updateMany({ art_id: art_id },
        {
            $set: {
                description: new_description,
                text: new_text
            }
        })
    res.send("success");
});

app.post("/search", async (req, res) => {
    search_val = req.body.search_val
    search_result = await Article.find({
        $or: [
            { subject: { $in: search_val } },
            { user_id: { $in: search_val } },
            { text: { $in: search_val } },
            { description: { $in: search_val } }
        ]
    });
    if (search_result) {
        res.send(search_result)
    }
    else if (search_result == []) {
        res.send("نتیجه ای یافت نشد")
    }
})

app.listen(port, () => {
    console.log("listening on port", port);
})