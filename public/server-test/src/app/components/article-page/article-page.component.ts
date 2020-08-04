import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

  post; 
  id;
  commentForm;

  constructor(
    private auth:AuthService,
    private posts:PostsService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 
    this.commentForm = this.formBuilder.group({
    text: ''
  });
}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      //What to call the variable?

      //  run posts.get to get the relevant post, store it in this.post
      this.posts.get(this.id).subscribe((data)=>{
        this.post = JSON.parse(JSON.stringify(data));
        console.log(this.post);
      },
      (err)=>{console.error(err);
      })

    });
    
  }

  isLoggedIn = () => {
    return this.auth.isLoggedIn();
  }

  //method for adding comments
  //
  addComment= (commentValue) => {
      if (!commentValue.text || commentValue.text==='') {return;}
      this.posts.addComment(this.post._id, {
          text: commentValue.text,
          //author:'user'
      }).subscribe((data) =>{
        console.log(data);

        
        data.data._creator={username:this.auth.currentUser()};
        //this is a silly workaround, there should be a way to get this info FROM the data and not need to grab it from the JWT token
        // If I want to do this, need to write a method to take _creator and get username
        //probably need to write a post service that makes a server call on the "User Routes", and write an appropriate userCntroller function
        
        console.log(data);

        this.post._comments.push(data.data);

          //this has more data than other comment. Could instead add
          //
          //text:data.data.text
          //createdAt:data.data.createdAt
          //_creator:data.data._creator
          //
          //to match the other comments. Optional.        
      },
      (err)=>{console.error(err);
      },
      ()=>{this.commentForm.reset();}
      );
  };
  
  

  //How will Upvotes work?
  //
  // $scope.incrementUpvotes=function(comment){
  //     posts.upvoteComment(post,comment)
  // }

  incrementUpvotes=(comment,vote)=>{
    this.posts.upvoteComment(this.id,comment,vote).subscribe((data)=>{
      // update the Data.post.score with the score from the updated post
      comment.score=data.data.score;
      // if (data.data.isPro) {
      //   console.log('got into filter');
      //   console.log(this.proData.find((element)=>{element._id===data.data._id}));
      //   //console.log(upvotedPost);
      //   //upvotedPost.score=data.data.score;
      // } else{
      //   console.log('got into filter 2');
      //   this.conData.find((element)=>element._id===data.data._id).score=data.data.score;
      // }
      console.log('vote successful');

    },
    (err)=>{
      console.error(err)
    }//final expression not needed?
    )
};

}
