import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  clickBtn: boolean; //alterando pelo click no bot?o alterar endere?o principal
  product!: any;
  total: any;
  cep!: string;
  data!: any
  bodyLocalStorage: any;

  prazoFrete: any;
  typoDeEnvio: any
  valorFreteSelect: any

  @ViewChild("name") nameCard: ElementRef | undefined;
  @ViewChild("cvc") cvcCard: ElementRef | undefined;
  @ViewChild("number") numberCard: ElementRef | undefined;
  @ViewChild("expiry") expiryCard: ElementRef | undefined;


  constructor(
    private router: Router,
    private http: HttpClient,
    ){
    this.clickBtn = true

      // this.product = history.state[0].product //pegando pela posicion do array
      // this.product = this.router.getCurrentNavigation()?.extras.state //esta recebendo o dado pela
      this.product = JSON.parse(localStorage.getItem('product') as string)

    this.total = this.router.getCurrentNavigation()?.extras.state
    this.total = history.state[0].total

    this.typoDeEnvio = "";
    this.valorFreteSelect = "";

    this.name = '';
      this.zipCode = '';
      this.street = '';
      this.number = '';
      this.neighborhood = '';
      this.city = '';
      this.uf = '';
      this.complement = '';

      this.http.get(`${environment.API_ECOMMERCE}/address/default`).subscribe((resposta: any) => {
        this.cep = resposta.zipCode;
        this.reteEPrazo()
      })
    }

    ngOnInit(): void {
      this.getAddress()
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
    })
  }

  removerProduct(id: any){
    console.log(this.product)
    this.product = this.product.filter((prod: any) => prod._id !== id)
    localStorage.setItem('product', JSON.stringify(this.product))
    console.log(id)
  }

  alterarEnderecoPrincial(){
    this.clickBtn = false;
  }

  reteEPrazo(){
    this.http.get(`${environment.API_ECOMMERCE}/frete/${this.cep}`).subscribe((resposta: any) => {
      this.data = resposta;
    })
  }

  typoEnvio(typo: any, valorFrete: any, prazo: any) {
    this.typoDeEnvio = typo;
    this.valorFreteSelect = valorFrete;
    this.prazoFrete = prazo;

    this.bodyLocalStorage = {
      tipo: this.typoDeEnvio,
      valor: this.valorFreteSelect,
      prazo: this.prazoFrete
    }

    localStorage.setItem('teste', JSON.stringify([this.bodyLocalStorage]));
  }
}
