import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  emailUser: string | null = '';

  constructor() { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }


  ngOnInit(): void {
    this.getEmail()
  }

  getEmail() {
    // @ts-ignore
    this.emailUser = this.getDecodedAccessToken( localStorage.getItem( 'token' ) )?.email;
    console.log(this.emailUser)
  }

}
