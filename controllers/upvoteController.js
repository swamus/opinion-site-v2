var db = require('./../models/index');
const { aggregate } = require('../models/User');

const upvoteController = {};

upvoteController.upvotePost = (req, res) => {

    const userId = req.payload._id;
    const postId = req.post._id;
    const amount = req.body.amount;

    db.Upvote.findOne({ $and: [{ _user: userId }, { _post: postId }] }).then((upvote) => {
        if (upvote) {
            db.Upvote.updateOne(upvote, { '$set': { 'amount': amount } }).then((updatedUpvote) => {

                //Aggregate: find all upvote objects with that postId, add together the "amount" fields on all of them and 
                //Post.findoneandupdate(postID) Score: the sum of the amount fields
                db.Upvote.aggregate([
                    { $match: { _post: postId } },
                    { $group: { _id: null, voteTotal: { $sum: "$amount" } } }
                ]).then((aggregateBody) => {
                    console.log(aggregateBody);
                    db.Post.findByIdAndUpdate(postId, { $set: { score: aggregateBody[0].voteTotal } },{new:true})
                        .then((post) => {
                            res.status(200).json({
                                success: true,
                                data: post,
                            });
                        }).catch((err) => {
                            res.status(500).json({
                                //success:false,
                                message: err,
                            });
                        });
                }).catch((err) => {
                    res.status(500).json({
                        //success:false,
                        message: err,
                    });
                });
            }).catch((err) => {
                res.status(500).json({
                    //success:false,
                    message: err,
                });
            });


        } else {

            const upvote = new db.Upvote({
                _user: userId,
                _post: postId,
                amount,
            });

            upvote.save().then((newUpvote) => {

                //Aggregate: 
                db.Upvote.aggregate([
                    { $match: { _post: postId } },
                    { $group: { _id: null, voteTotal: { $sum: "$amount" } } }
                ]).then((aggregateBody) => {
                    //console.log(aggregateBody);
                    db.Post.findByIdAndUpdate(postId, { $set: { score: aggregateBody[0].voteTotal } },{new:true})
                        .then((post) => {
                            res.status(200).json({
                                success: true,
                                data: post,
                            });
                        }).catch((err) => {
                            res.status(500).json({
                                //success:false,
                                message: err,
                            });
                        });
                }).catch((err) => {
                    res.status(500).json({
                        //success:false,
                        message: err,
                    });
                });

            }).catch((err) => {
                res.status(500).json({
                    //success:false,
                    message: err,
                });
            });
        }

    }).catch((err) => {
        res.status(500).json({
            //success:false,
            message: err,
        });
    });
}


upvoteController.upvoteComment = (req, res) => {

    const userId = req.payload._id;
    const commentId = req.comment._id;
    const amount = req.body.amount;

    db.Upvote.findOne({ $and: [{ _user: userId }, { _comment: commentId }] }).then((upvote) => {
        if (upvote) {

            db.Upvote.update(upvote, { '$set': { 'amount': amount } }).then((updatedUpvote) => {

                db.Upvote.aggregate([
                    { $match: { _comment: commentId } },
                    { $group: { _id:null, voteTotal: { $sum: "$amount" } } }
                ]).then((aggregateBody) => {
                    console.log(aggregateBody);
                    db.Comment.findByIdAndUpdate(commentId, { $set: { score: aggregateBody[0].voteTotal } },{new:true})
                        .then((comment) => {
                            res.status(200).json({
                                success: true,
                                data: comment,
                            });
                        }).catch((err) => {
                            res.status(500).json({
                                //success:false,
                                message: err,
                            });
                        });
                }).catch((err) => {
                    res.status(500).json({
                        //success:false,
                        message: err,
                    });
                });
            }).catch((err) => {
                res.status(500).json({
                    //success:false,
                    message: err,
                });
            });


        } else {

            const upvote = new db.Upvote({
                _user: userId,
                _comment: commentId,
                amount,
            });

            upvote.save().then((newUpvote) => {

                db.Upvote.aggregate([
                    { $match: { _comment: commentId } },
                    { $group: { _id:null, voteTotal: { $sum: "$amount" } } }
                ]).then((aggregateBody) => {
                    console.log(aggregateBody);
                    db.Comment.findByIdAndUpdate(commentId, { $set: { score: aggregateBody[0].voteTotal } },{new:true})
                        .then((comment) => {
                            res.status(200).json({
                                success: true,
                                data: comment,
                            });
                        }).catch((err) => {
                            res.status(500).json({
                                //success:false,
                                message: err,
                            });
                        });
                }).catch((err) => {
                    res.status(500).json({
                        //success:false,
                        message: err,
                    });
                });

            }).catch((err) => {
                res.status(500).json({
                    //success:false,
                    message: err,
                });
            });
        }

    }).catch((err) => {
        res.status(500).json({
            //success:false,
            message: err,
        });
    });
}



module.exports = upvoteController;