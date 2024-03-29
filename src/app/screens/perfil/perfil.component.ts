import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment"
import { Observable } from 'rxjs';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass']
})

export class PerfilComponent implements OnInit {
  email!: any;
  name!: any;
  id: any;
  genre: any;
  birthDate: any
  cpf: any
  registerDate: any
  loading: any;
  loadingSpinner:any
  messageError: any;
  showModal: any
  iconSettings: any;
  iconSeta:any;
  orders: any;
  flag!: boolean;

  constructor(
      private http: HttpClient
    ) {
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

    this.iconSeta = '/assets/img/seta.png';
  }

  ngOnInit(): void {
    this.loadingSpinner = true

    this.http
      .get(`${environment.API_ECOMMERCE}/user/userData`).subscribe((resData: any) => {
        this.name = resData.name;
        this.id = resData.id;
        this.email = resData.email;
        this.genre = resData.genre;
        this.birthDate = new Date(resData.birthDate);
        this.cpf = resData.cpf;
        this.registerDate = resData.registerDate;

        this.loadingSpinner = false
    })

    this.getPedido().subscribe(data => {
      this.orders = data;
      console.log('orders -> ',this.orders);
    });
  }

  getPedido(): Observable<any> {
    return this.http.get<any>(`${environment.API_ECOMMERCE}/order/user`);
  }

  save(data: any) {
    this.loading = true;
    this.http.post(`${environment.API_ECOMMERCE}/address/register`, data).subscribe((result: any) => {
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
      this.http.put(`${environment.API_ECOMMERCE}/user/userData`, data).subscribe((result: any) => {
        this.loading = false;
        this.ngOnInit()
      }, err => {
        this.messageError = err.error.message
        this.loading = false;
      });
  }

  showDetails(orders: any) {
    orders.showDetails = this.flag = !this.flag;
  }
}
