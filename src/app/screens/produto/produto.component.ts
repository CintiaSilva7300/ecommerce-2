import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.sass']
})
export class ProdutoComponent implements OnInit {
horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';

product!: any
loading: any;
cep!: string;
data!: any
msg: string = 'esse produto ja foi adicionado ao carrinho'

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar

    ){
      this.loading = false;

      this.http.get(`${environment.API_ECOMMERCE}/address/default`).subscribe((resposta: any) => {
        this.cep = resposta.zipCode;
        this.calculaFreteEPrazo()
      })
    }

  ngOnInit(): void {
    this.loading = true;
    const code = this.route.snapshot.params['code'];
    this.http
    .get(`${environment.API_ECOMMERCE}/product/${code}` ).subscribe((resposta: any) => {
      this.product = resposta;
      this.loading = false;
    })
  }

  calculaFreteEPrazo(){
    this.http.get(`${environment.API_ECOMMERCE}/frete/${this.cep}`).subscribe((resposta: any) => {
      this.data = resposta;
    })
  }

  setProduct(){
    const produtsLocalStorage = localStorage.getItem('product')
    if(!produtsLocalStorage){
      localStorage.setItem('product', JSON.stringify([this.product]));
    }else{
      const products = JSON.parse(produtsLocalStorage)

      console.log('aaaaaaaaaaaaaaaa',products)
      const productsExist = products.find((item: any) => item.code == this.product.code)
      if(!productsExist){
        products.push(this.product);
        localStorage.setItem('product', JSON.stringify(products))
      }else{
        console.log(this.msg);
      }
    }
  }
}
