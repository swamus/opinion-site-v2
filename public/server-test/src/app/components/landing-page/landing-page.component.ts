import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  postForm;

  zeroTrue: boolean = false;
  oneTrue: boolean = true;

  constructor(
    private auth:AuthService,
    private posts:PostsService,
    private formBuilder: FormBuilder,
  ) { 
    this.postForm = this.formBuilder.group({
      title: '',
      text: ''
    });
  }

  proData;
  conData;

  ngOnInit(): void {

    this.posts.getAllPro().subscribe((data)=>{
      console.log('getAllPro successful')
      this.proData = JSON.parse(JSON.stringify(data.data));
      for (let item of this.proData){
        item['amount'] = 0;
      }
      console.log(this.proData);
    },
    (err)=>{console.error(err);
    })

    this.posts.getAllCon().subscribe((data)=>{
      console.log('getAllPro successful')
      this.conData = JSON.parse(JSON.stringify(data.data));
    },
    (err)=>{console.error(err);
    })
  }

  isLoggedIn = () => {
    return this.auth.isLoggedIn();
  }


  //Method for making post:
  //
  addPost = (postValue, isPro)=>{
      if(!postValue.title || postValue.title===''){return; };
      this.posts.create({
          title: postValue.title,
          text: postValue.text,
          isPro:isPro,
      }).subscribe((data)=>{
        if (data.data.isPro) {
        this.proData.push(data.data);
        }else{
        this.conData.push(data.data);
        }

      },
      (err)=>{console.error(err);
      },
      ()=>{this.postForm.reset();}
      )
  };

  //Upvoting a post
  //
  //
  //front end needs to call incrementUpvotes with two arguments
  //1st argument is the actual post it's being called
  //2nd argument is 'vote'. This needs to be an object with property {amount: score (1, 0, or -1) }
  //the score passed in should be a 1 if an upvote was toggled on,
  //a -1 if a downvote was toggled on
  //and a 0 if an up/downvote that was already on is toggled *off*
  incrementUpvotes=(post,vote)=>{
    post.amount=vote.amount;
    // console.log(post.amount);
      // if (vote.amount === 1) {
      //   post.amount=vote.sm
      // }
      // if (vote === 0) {
      //   this.oneTrue = 
      // }
      this.posts.upvotePost(post,vote).subscribe((data)=>{
        // update the Data.post.score with the score from the updated post
        post.score=data.data.score;
        // if (data.data.isPro) {
        //   console.log('got into filter');
        //   console.log(this.proData.find((element)=>{element._id===data.data._id}));
        //   //console.log(upvotedPost);
        //   //upvotedPost.score=data.data.score;
        // } else{
        //   console.log('got into filter 2');
        //   this.conData.find((element)=>element._id===data.data._id).score=data.data.score;
        // }
        console.log('upvote successful');

      },
      (err)=>{
        console.error(err)
      }//final expression not needed?
      )
  };

}
