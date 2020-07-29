var db = require('./../models/index');

const postController = {};

postController.post = (req,res)=>{
    //gets info from post as request body, sets four variables to the four incoming properties
    const{
        title,
        text,
        //link, // Don't need links!
        // userId - getting it through JWT now
    } = req.body;
    
    //getting user ID from JWT - req.payload is defined in routes instead of here. Hopefully that doesn't cause issues since this function is only called in routes, but if it does try putting "var auth = jwt({secret:'SECRET',algorithms: ['HS256'],userProperty:'payload'});" in here as well
    const userId = req.payload._id;

    const post=new db.Post({
        title,
        text,
        //link,
        _creator:userId,
    })

    post.save().then((newPost)=>{
        res.status(200).json({
            success:true,
            data:newPost,
        });
    }).catch((err)=>{
        res.status(500).json({
            //success:false,
            message:err,
        });
    });
};


postController.getAll = (req,res)=>{

    db.Post.find({}).populate({
        path:'_creator',
        select: 'username createdAt -_id'
    }).populate({
        path:'_comments',
        select:'text createdAt _creator',
        match:{isDeleted:false}
    }).then((posts)=>{
        return res.status(200).json({
            success:true,
            data:posts
        });
    }).catch((err)=>{
        return res.status(500).json({
            message: err
        });
    });
}
//The above method gets every post, and replaces the creator ID with {the object that ID points to} (but only the 
//username and createdAt). And it also replaces the array of comment ID's with 
//an array of {the actual objects those ID's point to}, but only the comment test, createdAt and creatorID
//but our commentSchema.pre('find',autoPopulateCreater) function means that anytime a comment is found, the creatorId 
//is replaced by an object containing the username and createdAt of THAT creator. So that's what we get instead of
// the number


postController.paramFill = (req,res,next,id)=>{
    var query=db.Post.findById(id);
  
    query.exec(function(err,post){
      if (err){ return next(err);}
      if (!post){return next(new Error("can't find post"));}
  
      req.post=post;
      return next();
    });
}

postController.getOne = (req,res)=>{

    req.post.populate({
        path:'_comments',
        select:'text createdAt _creator',
        match:{isDeleted:false}
    },function(err, post){
        console.log('made it to controller');
        res.json(post);
    });
} 

//Upvotes method?


module.exports = postController;