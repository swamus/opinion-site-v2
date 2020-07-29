var mongoose = require('mongoose');

const { Schema } = mongoose;

//something about mongoose's promise library being deprecated?
mongoose.Promise=global.Promise


const commentSchema = new Schema({
   text: {type:String,required:true},
   isDeleted:{type:Boolean, default:false},
   createdAt:{type:Date,default:Date.now},
   _creator:{type:Schema.ObjectId, ref:'User'},
   _post:{type:Schema.ObjectId, ref:'Post'},
});

const autoPopulateCreater =function(next) {
    this.populate({
        path:'_creator',
        select:'username createdAt -_id'
    });
    next()
};
//Makes it so any time a comment is "found" from the collection, we auto replace the creatorId with 
//the object it points to (but only username and createdAt)
//So STORES the Id, but always gives us the actual creator info. Cool.

commentSchema.pre('find',autoPopulateCreater);

module.exports = mongoose.model('Comment',commentSchema);


// const Comment = mongoose.model('Comment',commentSchema);
// export default Comment;