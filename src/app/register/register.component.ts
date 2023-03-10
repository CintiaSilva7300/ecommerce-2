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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
    ){
    this.loading = false;
    this.messageError = "";
  }

  ngOnInit(): void {}

  save(data: any) {
    this.loading = true;

    console.log("form data", data);

    this.http.post(`${environment.API_TESTE}`, data).subscribe((result: any) => {
      console.log('result',result);
      console.log('birthDate', data.birthDate);

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
    },err => {
      console.log(err.error.message)
      this.messageError = err.error.message
      this.loading = false;
    });
    console.log('data',data);
  }

}
