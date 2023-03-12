import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment"
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loading: any;
  messageError: any;
  // userId: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  private router: Router,
    ){
   this.loading = false;
   this.messageError = "";
  }

  ngOnInit(): void {

  }


  public loginJWT(data: any) {
      this.loading = true;

      this.http.post(`${environment.API_TESTE}/login`, data).subscribe((result:any) => {
        console.log('result',result);
        const decodedToken: any = jwt_decode(result.token)

        console.log('decodedToken', decodedToken);
        localStorage.setItem('token', result.token);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('name', decodedToken.name);
        localStorage.setItem('id', decodedToken.id);

        this.loading = false;

        if(decodedToken){
          this.router.navigate(['']);
        }
      }, err => {
        console.log(err.error.message)
        this.messageError = err.error.message
        this.loading = false;
      });
  }
  }



