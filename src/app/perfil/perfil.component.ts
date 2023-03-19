import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment"
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass']
})
export class PerfilComponent implements OnInit {
[x: string]: any;

email!: any;
name!: any;
id: any
genre: any;
birthDate: any
cpf: any
registerDate: any
loading: any;
messageError: any;
showModal:any

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router){
    this.id = '';
    this.name = '';
    this.email = '';
    this.genre = '';
    this.cpf = '';
    this.registerDate = '';
    this.birthDate = '';

    this.loading = false;
    this.messageError = "";

    this.showModal = false;
  }

  ngOnInit(): void {
    console.log('aquiii')
    this.http
    .get(`${environment.API_TESTE}/user/userData`).subscribe((resData: any) => {
    this.name = resData.name;
    this.id = resData.id;
    this.email = resData.email;
    this.genre = resData.genre;
    this.birthDate = new Date(resData.birthDate);
    this.cpf = resData.cpf;
    this.registerDate = resData.registerDate;
    console.log('teste',resData)
    })

  }


  save(data: any) {
    this.loading = true;
    this.http.post(`${environment.API_TESTE}/address/register`, data).subscribe((result: any) => {
        this.loading = false;
    },err => {
      console.log(err.error.message)
      this.messageError = err.error.message
      this.loading = false;
    });
  }

  openModal() {
    this.showModal = true;
  }

  atualizarPerfil(data: any) {
    // this.loading = true;

    // this.http.put(`${environment.API_TESTE}/user/userData`, data).subscribe((result: any) => {
    //   const decodedToken: any = jwt_decode(result.token)

    //     this.loading = false;

    //     if(decodedToken){
    //       this.router.navigate(['']);
    //     }

    // },err => {
    //   console.log(err.error.message)
    //   this.messageError = err.error.message
    //   this.loading = false;
    // });
  }
}
