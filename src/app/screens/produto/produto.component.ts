import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/interface/products';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.sass']
})
export class ProdutoComponent implements OnInit {
horizontalPosition: MatSnackBarHorizontalPosition = 'start';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';

product!: Products
loading: any;
cep!: string;
data!: any
msg: string = 'esse produto ja foi adicionado ao carrinho'

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private getproducts: UserService

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
    // console.log('1111111111111111111',this.getproducts.getProducts())
  }

  calculaFreteEPrazo(){
    this.http.get(`${environment.API_ECOMMERCE}/frete/${this.cep}`).subscribe((resposta: object) => {
      this.data = resposta;
    })
  }

  setProduct(){
    const produtsLocalStorage = localStorage.getItem('product')
    if(!produtsLocalStorage){
      localStorage.setItem('product', JSON.stringify([this.product]));
    }else{
      const products = JSON.parse(produtsLocalStorage)

      const productsExist = products.find((item: string | any) => item.code == this.product.code)
      if(!productsExist){
        products.push(this.product);
        localStorage.setItem('product', JSON.stringify(products))
      }else{
        // console.log(this.msg)
      }
    }
  }

  navegandoParaTelaPagemnto() {
    this.router.navigate(['/pagamento'], {
      state: [{ product: this.product}],
    });
    //fun??o que pegar os dados do componente atual e manda para o componente de pagamento
  }
}
