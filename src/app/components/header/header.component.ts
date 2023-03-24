import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
token: any;
id: any;
genre: any;
iconMenu: any;

  constructor(private http: HttpClient,){
    this.token = '';
    this.genre = '';

    this.iconMenu = '/assets/img/icons8-cardápio-78.png';
  }

  ngOnInit(){
      this.token = localStorage.getItem('token');
      this.id = localStorage.getItem('id');
      this.genre = localStorage.getItem('genre');
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

  // darkMod(){
  //   document.body.classList.toggle('dark-theme');
  //   console.log('teste ok --------')
  // }
}
