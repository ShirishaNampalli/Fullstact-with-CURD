const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title : String,
    Note : String,
    author : String,
    category : String,
    authorID :String
});

const noteModel = mongoose.model("note", noteSchema);

module.exports = {
    noteModel
}