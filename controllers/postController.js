var db = require('./../models/index');

const postController = {};

postController.post = (req,res)=>{
    //gets info from post as request body, sets three variables to the three incoming properties
    const{
        title,
        text,
        isPro,
        // userId - getting it through JWT now
    } = req.body;
    
    //getting user ID from JWT - req.payload is defined in routes instead of here. Hopefully that doesn't cause issues since this function is only called in routes, but if it does try putting "var auth = jwt({secret:'SECRET',algorithms: ['HS256'],userProperty:'payload'});" in here as well
    const userId = req.payload._id;

    const post=new db.Post({
        title,
        text,
        isPro,
        //link,
        _creator:userId,
    })

    post.save().then((newPost)=>{
        res.status(200).json({
            success:true,
            data:newPost,
            //If necessary, should be possible to use the req.payload to get the username of the creator and attach it to this object
        });
    }).catch((err)=>{
        res.status(500).json({
            //success:false,
            message:err,
        });
    });
};


postController.getAllPro = (req,res)=>{

    db.Post.find({isPro:true}).populate({
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
};

postController.getAllCon = (req,res)=>{

    db.Post.find({isPro:false}).populate({
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
};


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