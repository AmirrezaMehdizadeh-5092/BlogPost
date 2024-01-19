const mongose = require("mongoose");

const ArticleInfo = mongose.Schema({
    art_id:
    {
        type: String,
        maxlength: 50,
        required: true,
        index:
        {
            unique: true,
            dropDups: true
        }
    },
    user_id:
    {
        type: String,
        maxlength: 50,
        required: true,
    },
    subject:
    {
       type: String,
       required: true,
    },
    description:
    {
       type: String,
       required: true,
    },
    text:
    {
       type: String,
       required: true,
    },
    joinDate:
    {
        type: Date,
        default: Date.now
    }
})

Article = mongose.model("Article", ArticleInfo);
module.exports = Article;