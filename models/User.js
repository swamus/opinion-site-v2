var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const { Schema } = mongoose;

//something about mongoose's promise library being deprecated?
mongoose.Promise=global.Promise


const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        minLength: [5, 'Username must be 5 characters or more'],
    },
    // password:{
    //     type: String,
    //     required: true,
    //     minLength: [8, 'Password must be 8 characters or more'],
    // },
    hash: String,
    salt: String,
    createdAt:{type:Date,default:Date.now},
    isDeleted:{type:Boolean, default:false},
});

userSchema.methods.setPassword=function(password){
    this.salt=crypto.randomBytes(16).toString('hex');
    this.hash=crypto.pbkdf2Sync(password,this.salt,1000,64,'sha1').toString('hex');

};

userSchema.methods.validPassword=function(password){
    var hash=crypto.pbkdf2Sync(password,this.salt,1000,64,'sha1').toString('hex');

    return this.hash === hash;
};

userSchema.methods.generateJWT=function(){
    //set exp to 60 days
    var today = new Date();
    var exp= new Date(today);
    exp.setDate(today.getDate()+60);

    return jwt.sign({
        _id:this._id,
        username:this.username,
        exp:parseInt(exp.getTime()/1000),
        //created at, is deleted?
    }, 'SECRET');
};

module.exports = mongoose.model('User',userSchema);



//Old syntax, for use w/ Babel?
// const User = mongoose.model('User',userSchema);
// export default User;
//
// or drop the module.exports and declare 
//mongoose.model('User',userSchema); 
//and then make the new user inside the controller itself?

