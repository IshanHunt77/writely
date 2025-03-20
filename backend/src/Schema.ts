import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {type:String,required:true,unique:true},
    profilePhoto:{type:String},
    email:{type:String,required:true,unique:true},
    password : {type:String,required:true}
});

const User = mongoose.model("User",UserSchema);

const BlogSchema = new mongoose.Schema({
    title : {type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    blog : {type:String,required:true,maxlength:4000},
    imagelink:{type:String},
    upvote : {type:Number,default:0},
    downvote : {type:Number,default:0},
    tags : {type:[String],required:true}
})

const Blog = mongoose.model("Blog",BlogSchema);

const Commentschema = new mongoose.Schema({
    blogId:{type:mongoose.Schema.Types.ObjectId,ref:"Blog"},
    author:{type : String},
    comment:{type:String,maxlength:1000},
    upvote : {type:Number,default:0},
    downvote : {type:Number,default:0}
})

const Comments = mongoose.model("Comments",Commentschema);

export {
    User,
    Blog,
    Comments
}