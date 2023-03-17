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
  constructor(private route: ActivatedRoute,){
    this.token = '';
    this.id = ''
    this.genre = ''
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
}
