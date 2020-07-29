var db = require('./../models/index');

const commentController={};

commentController.post = (req, res)=>{
    const { 
        text,
        //userId, - thru JWT
        //postId, - thru route parameter
    } = req.body;
     //getting user ID from JWT - req.payload is defined in routes instead of here. Hopefully that doesn't cause issues since this function is only called in routes, but if it does try putting "var auth = jwt({secret:'SECRET',algorithms: ['HS256'],userProperty:'payload'});" in here as well
     const userId = req.payload._id;
     const postId = req.post._id;


    const comment= new db.Comment({
        text,
        _creator:userId,
        _post:postId
    });

    comment.save().then((newComment)=>{
        db.Post.findByIdAndUpdate(
            postId,
            {$push:{'_comments':newComment._id} }
            ).then((existingPost)=>{
                res.status(200).json({
                    success:true,
                    data:newComment,
                    existingPost,
                });
            }).catch((err)=>{
                res.status(500).json({
                    //success:false,
                    message:err,
                });
            });
    }).catch((err)=>{
        res.status(500).json({
            //success:false,
            message:err,
        });
    });
}

commentController.paramFill = (req,res, next, id)=>{
    var query=db.Comment.findById(id);
  
    query.exec(function(err,comment){
      if (err){ return next(err);}
      if (!comment){return next(new Error("can't find comment"));}
  
      req.comment=comment;
      return next();
    });
}

//Upvotes method?

module.exports = commentController;