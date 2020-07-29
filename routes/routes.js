var express = require('express');
var jwt = require('express-jwt');
var auth = jwt({secret:'SECRET',algorithms: ['HS256'],userProperty:'payload'});

//controller imports
var basicController = require('../controllers/basicController');
var userController = require('../controllers/userController');
var postController = require('../controllers/postController');
var commentController =require('../controllers/commentController');

const routes=express.Router(); //Maybe just make this an express.Router() instead??

//Basic Routes
routes.get('/',basicController.get);





//User Routes
routes.post('/register',userController.register);

routes.post('/login', userController.login);




//Post Paramater
routes.param('post', postController.paramFill);

//Post Routes
routes.get('/posts',postController.getAll);

routes.post('/posts',auth, postController.post);

routes.get('/posts/:post',postController.getOne);

//upvote post?
//router.put('posts/:post/upvote', )


//Comment Paramater
routes.param('comment', commentController.paramFill);

//Comment Routes
routes.post('/posts/:post/comments', auth, commentController.post);

//upvote comment?
//router.put('posts/:post/comments/:comment/upvote', )


module.exports = routes;