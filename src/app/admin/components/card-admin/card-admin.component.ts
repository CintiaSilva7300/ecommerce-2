import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrls: ['./card-admin.component.sass']
})
export class CardAdminComponent implements OnInit{
userLength: any;
productsLength: any;
getUserADmin: any;

  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.getUser();
    this.getProduct();
    this.getUsersAdmin();
  }

  getUser(): void{
    this.http.get(`${environment.API_ECOMMERCE}/user`).subscribe((data: any) =>{
      this.userLength = data.length;
    })
  }
  getProduct(): void{
    this.http.get(`${environment.API_ECOMMERCE}/product`).subscribe((data: any) =>{
      this.productsLength = data.length;
    })
  }

  getUsersAdmin(){
    this.http
    .get(`${environment.API_ECOMMERCE}/user` ).subscribe((resposta: any) => {
      console.log(resposta)
      // const result = resposta.filter((resposta:any) => resposta.permission === 'ADMIN').length;
      this.getUserADmin = resposta.filter((user:any) => user.permission.includes('ADMIN')).length;
      console.log('filtro -> ', this.getUserADmin)
    })
  }
}

