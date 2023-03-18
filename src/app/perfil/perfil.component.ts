import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass']
})
export class PerfilComponent implements OnInit {
email!: any;
name!: any;
id: any
genre: any;
birthDate: any
cpf: any
registerDate: any

  constructor(private userService: UserService, private http: HttpClient){
    this.id = '';
    this.name = '';
    this.email = '';
    this.genre = '';
    this.birthDate = '';
    this.cpf = '';
    this.registerDate = '';
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.genre = localStorage.getItem('genre');
    this.birthDate = localStorage.getItem('birthDate');
    this.cpf = localStorage.getItem('cpf');
    this.registerDate = localStorage.getItem('registerDate');


    this.http
    .get(`${environment.API_TESTE}/user/userData`).subscribe((res: any) => {
        console.log('chegouuuuuuuuuuuuuuuuuuu',res);
    })
  }

}
