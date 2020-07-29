import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  //user={};
  //need to get user.username and user.password from the frontend
  logInForm;

  constructor(
    private auth:AuthService,
    public router:Router,
    private formBuilder: FormBuilder,
  ) {
    this.logInForm = this.formBuilder.group({
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

  logIn = function(user){
    this.auth.logIn(user).subscribe((data) => {
      this.auth.saveToken(data.token);
      //console.log('token saved')
      this.logInForm.reset();

    },
    (err) => {
      console.error(err);
      this.logInForm.reset();
      //How to get specifics of error and pop them up in window? "incorrect username", etc
    },
    () =>{
      console.log('routing back home...');
      this.router.navigateByUrl('/home');
      //Not sure about this, might need to replace - location service from angular/common?
      //Should this redirect go in "subscribe' or here?
    })
  };

}
