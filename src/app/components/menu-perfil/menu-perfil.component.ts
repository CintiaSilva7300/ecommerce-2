import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    ){
      this.name = '';
      this.zipCode = '';
      this.street = '';
      this.number = '';
      this.neighborhood = '';
      this.city = '';
      this.uf = '';
      this.complement = '';

      this.messageError = "";
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

  excluirCardsEndereco(id: any): void {
    this.http.delete(`${environment.API_TESTE}/address/${id}`).subscribe((res: any) => {
      this.ngOnInit()
      console.log('testeeeeeeeeeeeee ',res)
    }, err => {
      this.messageError = err.error.message
      console.log('errroooo',err)
    })
  }

  // excluirCardsEnderecott(id: any): void {
  //   this.http.put(`${environment.API_TESTE}/address/${id}`).subscribe((res: any) => {
  //     this.ngOnInit()
  //     console.log('testeeeeeeeeeeeee ',res)
  //   })
  // }
}
