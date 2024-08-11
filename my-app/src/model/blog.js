import mongoose from 'mongoose';

const BlogsSchema = new mongoose.Schema({
    title:String,
    description:String,
});
const Blog  = mongoose.models.Blog || mongoose.model("Blog",BlogsSchema);

export default Blog;