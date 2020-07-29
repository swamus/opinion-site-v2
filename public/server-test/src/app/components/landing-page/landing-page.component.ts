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

  ngOnInit(): void {
    //need to run posts.getAll, set proData=posts.posts after doing that
    this.posts.getAll().subscribe((data)=>{
      console.log('getAll successful')
      this.proData = JSON.parse(JSON.stringify(data.data));
      //wait, this is an array not an object. I guess stringify still works!
    },
    (err)=>{console.error(err);
    })
  }

  isLoggedIn = () => {
    return this.auth.isLoggedIn();
  }


  //Method for making post:
  //
  addPost = (postValue)=>{
      if(!postValue.title || postValue.title===''){return; };
      this.posts.create({
          title: postValue.title,
          text: postValue.text,
      }).subscribe((data)=>{
        this.proData.push(data.data);
        //this.postForm.reset();
      },
      (err)=>{console.error(err);
      },
      ()=>{this.postForm.reset();}
      )
  };

  //How will Upvotes work?
  //
  // incrementUpvotes=(post)=>{
  //     posts.upvote(post);
  // };

}
