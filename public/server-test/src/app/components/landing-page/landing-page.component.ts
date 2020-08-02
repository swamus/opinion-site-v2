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
  conData;

  ngOnInit(): void {

    this.posts.getAllPro().subscribe((data)=>{
      console.log('getAllPro successful')
      this.proData = JSON.parse(JSON.stringify(data.data));
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

  //How will Upvotes work?
  //
  // incrementUpvotes=(post)=>{
  //     posts.upvote(post);
  // };

}
