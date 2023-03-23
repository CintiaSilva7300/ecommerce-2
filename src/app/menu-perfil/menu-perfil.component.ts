import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient){
      this.name = '';
      this.zipCode = '';
      this.street = '';
      this.number = '';
      this.neighborhood = '';
      this.city = '';
      this.uf = '';
      this.complement = '';
  }

  ngOnInit(): void {
    this.http
    .get(`${environment.API_TESTE}/address/user` ).subscribe((res: any) => {
      this.address = res
    })
  }

  selectCardsEndereco(id: any){
    this.http.put(`${environment.API_TESTE}/address/setMainAddress`, {addressId: id}).subscribe((res: any) => {
      this.ngOnInit()
    })
  }
}
