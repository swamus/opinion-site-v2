var mongoose = require('mongoose');

const { Schema } = mongoose;

//something about mongoose's promise library being deprecated?
mongoose.Promise=global.Promise


const upvoteSchema = new Schema({
   _user:{type:Schema.ObjectId, ref:'User'},
   _post:{type:Schema.ObjectId, ref:'Post'},
   _comment:{type:Schema.ObjectId, ref:'Comment'},
   amount:{type:Number},
});

module.exports = mongoose.model('Upvote',upvoteSchema);