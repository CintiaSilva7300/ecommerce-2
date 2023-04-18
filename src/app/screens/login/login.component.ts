import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
//teste login social
loginForm!: FormGroup;
socialUser!: SocialUser;
isLoggedin?: boolean = undefined;
//teste login social


  loading: any;
  messageError: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,

    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
    ){
   this.loading = false;
   this.messageError = "";

   console.log('isLoggedin ->',this.isLoggedin);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  // login social
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }
  // login social


  public loginJWT(data: any) {
      this.loading = true;

      this.http.post(`${environment.API_TESTE}/user/login`, data).subscribe((result:any) => {
        const decodedToken: any = jwt_decode(result.token)

        localStorage.setItem('name', decodedToken.name);
        localStorage.setItem('id', decodedToken.id);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('token', result.token);
        localStorage.setItem('genre', decodedToken.genre);
        localStorage.setItem('permission', decodedToken.permission);

        this.loading = false;

        if(decodedToken){
          this.router.navigate(['']);
        }
      }, err => {
        this.messageError = err.error.message
        this.loading = false;
      });
  }
  }



