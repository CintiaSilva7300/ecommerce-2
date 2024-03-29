import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'menuPerfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.sass']
})
export class MenuPerfilComponent implements OnInit {
name: any;
zipCode: any;
street: any;
number: any;
neighborhood: any;
city: any;
uf: any;
complement: any;
address: any
messageError: any;
id: any
loading: any;
showModal: any
addressSelected: any

  constructor(
    private http: HttpClient,

    ){
      this.loading = false;

      this.name = '';
      this.zipCode = '';
      this.street = '';
      this.number = '';
      this.neighborhood = '';
      this.city = '';
      this.uf = '';
      this.complement = '';
      this.messageError = "";

      this.showModal = false;
  }

  ngOnInit(): void {
    this.http
    .get(`${environment.API_ECOMMERCE}/address/user` ).subscribe((res: any) => {
      this.address = res
    })
  }

  selectCardsEndereco(id: any){
    this.http.put(`${environment.API_ECOMMERCE}/address/setMainAddress`, {addressId: id}).subscribe((res: any) => {
      this.ngOnInit()
    })
  }

  excluirCardsEndereco(id: any): void {
    this.http.delete(`${environment.API_ECOMMERCE}/address/${id}`).subscribe((res: any) => {
      this.ngOnInit()
    }, err => {
      this.messageError = err.error.message
    })
  }

  openModal(data: any) {
    this.addressSelected = data;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
