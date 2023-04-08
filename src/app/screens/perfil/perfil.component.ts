import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment"
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '@angular/compiler';
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
  loading: any;
  loadingSpinner:any
  messageError: any;
  showModal: any
  iconSettings: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = '';
    this.name = '';
    this.email = '';
    this.genre = '';
    this.cpf = '';
    this.registerDate = '';
    this.birthDate = '';

    this.loading = false;
    this.loadingSpinner = false;

    this.messageError = "";

    this.showModal = false;

    this.iconSettings = '/assets/img/settings.png';
  }

  ngOnInit(): void {
    this.loadingSpinner = true

    this.http
      .get(`${environment.API_TESTE}/user/userData`).subscribe((resData: any) => {
        this.name = resData.name;
        this.id = resData.id;
        this.email = resData.email;
        this.genre = resData.genre;
        this.birthDate = new Date(resData.birthDate);
        this.cpf = resData.cpf;
        this.registerDate = resData.registerDate;

        this.loadingSpinner = false
    })
  }


  save(data: any) {
    this.loading = true;
    this.http.post(`${environment.API_TESTE}/address/register`, data).subscribe((result: any) => {
      this.loading = false;
    }, err => {
      this.messageError = err.error.message
      this.loading = false;
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  atualizarPerfil(data: any) {
      this.loading = true;
      this.http.put(`${environment.API_TESTE}/user/userData`, data.id,).subscribe((result: any) => {
        this.loading = false;
        this.ngOnInit()
      }, err => {
        this.messageError = err.error.message
        this.loading = false;
      });
  }
}
