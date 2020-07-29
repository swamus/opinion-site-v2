import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  //user={};
  //need to get user.username and user.password from the frontend

  registrationForm;

  constructor(
    private auth:AuthService,
    public router:Router,
    private formBuilder: FormBuilder,
  ) { 
    this.registrationForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    //if already logged in, send to 'home'
    if ( this.auth.isLoggedIn()){
      this.router.navigateByUrl('/home');
    }
  }


  //Not sure if this is right
  register = (user) => {
    this.auth.register(user).subscribe((data)=>{
      this.auth.saveToken(data.token);
      //console.log('token saved')
      this.registrationForm.reset();
    },
    (err) => {
      console.error(err);
      this.registrationForm.reset();
      //How to get specifics of error and pop them up in window? "incorrect username", etc
    },
    () => {
      console.log('routing back home...');
      this.router.navigateByUrl('/home');
      //Not sure about this, might need to replace - location service from angular/common?
      //Should this go in "subscribe' or here?
    })
    }
    
}
