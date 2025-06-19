import { Schema, model, models } from "mongoose";

const postSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['design', 'development', 'marketing'],
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});


const Post = models.Post || model('Post', postSchema);

export default Post;
