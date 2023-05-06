import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.sass']
})
export class CadastrarProdutoComponent implements OnInit {
loading: any;
product: any

id: any;
name: any
code: any;
price!: number;
type: any;
quantity!: number;
urlImage: any;
status!: boolean

  constructor(
    private http: HttpClient,
    private router: Router
  ){
    this.product = this.router.getCurrentNavigation()?.extras.state
    console.log(this.product)

    if(this.product){
      this.id = this.product._id
      this.name = this.product.name
      this.code = this.product.code
      this.price = this.product.price
      this.type = this.product.type
      this.quantity = this.product.quantity
      this.urlImage = this.product.urlImage
      this.status = this.product.status
    }
  }

  ngOnInit(): void {

  }

  cadastrarProduto() {
    const data = {
      name: this.name,
      code: this.code,
      price: this.price,
      type: this.type,
      quantity: this.quantity,
      urlImage: this.urlImage,
      status: this.status,
    }
    console.log(data)
    this.loading = true;
    if(this.id){
      this.http.put(`${environment.API_ECOMMERCE}/product/${this.id}`, data).subscribe((result: any) => {
        this.loading = false;
      },err => {
        console.log(err.error.message)
        this.loading = false;
      });
    }else {
      this.http.post(`${environment.API_ECOMMERCE}/product`, data).subscribe((result: any) => {

        this.loading = false;
      },err => {
        console.log(err.error.message)
        this.loading = false;
      });
    }
  }
}
