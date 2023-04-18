import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {  Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.sass'],
  providers: [],
})
export class PagamentoComponent implements OnInit {
  name: any;
  zipCode: any;
  street: any;
  number: any;
  neighborhood: any;
  city: any;
  uf: any;
  complement: any;
  address: any


  product!: any;
  total: any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
    ){
    this.product = this.router.getCurrentNavigation()?.extras.state //esta recebendo o dado pela navegação
      this.product = history.state[0].product //pegando pela posicion do array
      console.log('- 1', this.product);

    this.total = this.router.getCurrentNavigation()?.extras.state
    this.total = history.state[0].total
    // console.log('total', this.total);

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
      this.getAddress()
      // this.removerProduct()
    }

    formatPrice(price: number) {
      return price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    }

  getAddress() {
    this.http
    .get(`${environment.API_ECOMMERCE}/address/user` ).subscribe((res: any) => {
      this.address = res

     console.log(this.address);
    })
  }

  removerProduct(id: any){
    this.product.splice(this.product.indexOf(id))
    console.log('product ID ->',this.product)
  }
}
