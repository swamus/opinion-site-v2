var express = require('express');
var jwt = require('express-jwt');
var auth = jwt({ secret: 'SECRET', algorithms: ['HS256'], userProperty: 'payload' });

//controller imports
var basicController = require('../controllers/basicController');
var userController = require('../controllers/userController');
var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController');
var upvoteController = require('../controllers/upvoteController');

const routes = express.Router(); //Maybe just make this an express.Router() instead??

//Basic Routes
routes.get('/', basicController.get);





//User Routes
routes.post('/register', userController.register);

routes.post('/login', userController.login);




//Post Paramater
routes.param('post', postController.paramFill);

//Post Routes
routes.get('/posts-pro', postController.getAllPro);

routes.get('/posts-con', postController.getAllCon);

routes.post('/posts', auth, postController.post);

routes.get('/posts/:post', postController.getOne);


//upvote post?
routes.put('/posts/:post/upvote', auth, upvoteController.upvotePost)


//Comment Paramater
routes.param('comment', commentController.paramFill);

//Comment Routes
routes.post('/posts/:post/comments', auth, commentController.post);

//upvote comment?
routes.put('/posts/:post/comments/:comment/upvote', auth, upvoteController.upvoteComment)
//add auth


module.exports = routes;