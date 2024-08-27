const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    name: String,
    picture: String,
})

const User = mongoose.model("User", userSchema);
module.exports = User;