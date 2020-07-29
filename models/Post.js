var mongoose = require('mongoose');

const { Schema } = mongoose;

//something about mongoose's promise library being deprecated?
mongoose.Promise=global.Promise


const postSchema = new Schema({
   title:{type:String, required:true},
   //link: String,
   // - link might not be necessary for us
   text: String,
   isDeleted:{type:Boolean, default:false},
   createdAt:{type:Date,default:Date.now},
   _creator:{type:Schema.ObjectId, ref:'User'},
   //tells the schema to expect an ID here, from a document within the 'users' collection
   _comments:[{type:Schema.ObjectId, ref:'Comment'}]
   //tells the schema to expect an array of ID's here, from documents within the 'comments' collection
});

module.exports = mongoose.model('Post',postSchema);

// const Post = mongoose.model('Post',postSchema);
// export default Post;

// or drop the module.exports and declare 
//mongoose.model('Post',postSchema); 
//and then make the new post inside the controller itself?