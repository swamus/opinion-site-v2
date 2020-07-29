import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn = () => {
    return this.auth.isLoggedIn();
  }

  currentUser = () => {
    return this.auth.currentUser();
  }

  logOut = () => {
    this.auth.logOut();
  }

}
