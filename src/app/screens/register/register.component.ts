import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit{
loading: any;
messageError: any;
genre:any

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
    ){
    this.loading = false;
    this.messageError = "";
    this.genre = ''
  }

  ngOnInit(): void {
  }

  save(data: any) {
    this.loading = true;

    this.http.post(`${environment.API_ECOMMERCE}/user/register`, data).subscribe((result: any) => {
      const decodedToken: any = jwt_decode(result.token)

        localStorage.setItem('token', result.token);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('name', decodedToken.name);
        localStorage.setItem('id', decodedToken.id);
        localStorage.setItem('genre', data.genre);
        this.loading = false;

      if(decodedToken){
        this.router.navigate(['']);
      }

    },err => {
      console.log(err.error.message)
      this.messageError = err.error.message
      this.loading = false;
    });
  }

}
