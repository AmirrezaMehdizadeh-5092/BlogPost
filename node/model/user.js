const mongose = require("mongoose");

const UserInfo = mongose.Schema({
    username:
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
    password:
    {
       type: String,
       required: true,
    },
    role:
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

User = mongose.model("User", UserInfo);
module.exports = User;