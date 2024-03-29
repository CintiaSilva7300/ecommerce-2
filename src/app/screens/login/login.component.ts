import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
isLoggedin?: boolean = undefined;
user!: SocialUser;
loading: any;
messageError: any;

horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';

constructor(
  private http: HttpClient,
  private route: ActivatedRoute,
  private router: Router,
  private authService: SocialAuthService,
  private _snackBar: MatSnackBar
) {
  this.loading = false;
  this.messageError = '';
}

  ngOnInit(): void {}

loginFacebook(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, { scope: 'public_profile' }).then((user) => {
    this.user = user;

    const bodyFacebook = {
      name: user.name,
      email: user.email,
      typeLogin: 'facebook'
    };

    this.http
      .post(`${environment.API_ECOMMERCE}/user/loginSocial`, bodyFacebook)
      .subscribe((result: any) => {
        const decodedToken: any = jwt_decode(result.token);

        localStorage.setItem('name', decodedToken.name);
        localStorage.setItem('id', decodedToken.id);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('token', result.token);
        localStorage.setItem('genre', decodedToken.genre);
        localStorage.setItem('permission', decodedToken.permission);

        if (decodedToken) {
          this.openSnackBar()
          this.router.navigate(['']);
        }
      });
    this.user = user;
  });
}

public loginJWT(data: any) {
  this.loading = true;

  this.http.post(`${environment.API_ECOMMERCE}/user/login`, data).subscribe(
    (result: any) => {
      const decodedToken: any = jwt_decode(result.token);

      localStorage.setItem('name', decodedToken.name);
      localStorage.setItem('id', decodedToken.id);
      localStorage.setItem('email', decodedToken.email);
      localStorage.setItem('token', result.token);
      localStorage.setItem('genre', decodedToken.genre);
      localStorage.setItem('permission', decodedToken.permission);

      this.loading = false;

      if (decodedToken) {
        this.openSnackBar()
        this.router.navigate(['']);
      }
    },
    (err) => {
      this.messageError = err.error.message;
      this.loading = false;
    }
  );
  }

  openSnackBar() { //alert
    this._snackBar.open(`Login realizado com sucesso!`,`Ok!`, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
