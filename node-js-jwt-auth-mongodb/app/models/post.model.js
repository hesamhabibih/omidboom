const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: { type: String, required: false },
    content: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    name:{ type: String, required: false },
    author: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User", 
         required: true
       }
     ]
  })
);

module.exports = Post;
