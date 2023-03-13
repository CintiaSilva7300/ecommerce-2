import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
token: any
  constructor(private http: HttpClient,){
    this.token = '';
  }

  ngOnInit(){
      this.token = localStorage.getItem('token');
    }

    logout(){
      localStorage.clear();
      window.location.reload();
    }
}
