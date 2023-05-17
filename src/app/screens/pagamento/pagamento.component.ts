import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  address: any;
  clickBtn: boolean; //alterando pelo click no bot?o alterar endere?o principal
  product!: any;
  total: any;
  totalPrice: number = 0;
  cep!: string;
  data!: any;
  bodyLocalStorage: any;
  qtd: number = 0;
  prazoFrete: any;
  typoDeEnvio: any;
  valorFreteSelect: any;
  installments: any;

  iconeCartao: any;

  @ViewChild('name') nameCard: ElementRef | undefined;
  @ViewChild('cvc') cvcCard: ElementRef | undefined;
  @ViewChild('number') numberCard: ElementRef | undefined;
  @ViewChild('expiry') expiryCard: ElementRef | undefined;

  constructor(
      private router: Router,
      private http: HttpClient,
      private cdRef: ChangeDetectorRef,
    ) {
    this.clickBtn = true;
    this.product = JSON.parse(localStorage.getItem('product') as string);

    this.total = this.router.getCurrentNavigation()?.extras.state;
    this.total = history.state[0].total;

    this.typoDeEnvio = '';
    this.valorFreteSelect = '';

    this.name = '';
    this.zipCode = '';
    this.street = '';
    this.number = '';
    this.neighborhood = '';
    this.city = '';
    this.uf = '';
    this.complement = '';

    this.iconeCartao = '/assets/img/iconeCartão.png';

    this.http
      .get(`${environment.API_ECOMMERCE}/address/default`)
      .subscribe((resposta: any) => {
        this.cep = resposta.zipCode;
        this.freteEPrazo();

        localStorage.setItem('enderecoDefault', JSON.stringify([resposta]));
      });
  }

  ngOnInit(): void {
    this.getAddress();
    const productLocalStorage = localStorage.getItem('product');
    this.product = JSON.parse(productLocalStorage as any);
    this.product = this.product.map((product: any) => {
      product.qtd = 1;
      return product;
    });
    localStorage.setItem('product', JSON.stringify(this.product))
    this.totalCarrinho();
  }

  formatPrice(price: number) {
    return price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getAddress() {
    this.http
      .get(`${environment.API_ECOMMERCE}/address/user`)
      .subscribe((res: any) => {
        this.address = res;
      });
  }

  removerProduct(id: any) {
    console.log(this.product);
    this.product = this.product.filter((prod: any) => prod._id !== id);
    localStorage.setItem('product', JSON.stringify(this.product));
    this.total = this.product;
    // return this.product = this.total;
  }

  alterarEnderecoPrincial() {
    this.clickBtn = false;
  }

  freteEPrazo() {
    this.http
      .get(`${environment.API_ECOMMERCE}/frete/${this.cep}`)
      .subscribe((resposta: any) => {
        this.data = resposta;
      });
  }

  typoEnvio(typo: any, valorFrete: any, prazo: any) {
    this.typoDeEnvio = typo;
    this.valorFreteSelect = valorFrete;
    this.prazoFrete = prazo;

    this.bodyLocalStorage = {
      tipo: this.typoDeEnvio,
      valor: this.valorFreteSelect,
      prazo: this.prazoFrete,
    };
    localStorage.setItem('typoEnvio', JSON.stringify(this.typoDeEnvio));
  }

  pagamento(data: any) {
    const productCarrinho = JSON.parse(localStorage.getItem('product') as any);
    const produtosFormatados = productCarrinho.map((p: any) => {
      return { code: p.code, quantity: p.qtd };
    });

    const enderecoDefault = JSON.parse(localStorage.getItem('enderecoDefault') as any);

    const typoEnvioFormat = JSON.parse(localStorage.getItem('typoEnvio') as any);

    const body = {
      payment: {
        card: {
          cvc: data.form.value.cvc,
          number: data.form.value.number,
          name: data.form.value.name,
          expiry: data.form.value.expiry,
        },
        installments: data.form.value.installments, //parcelas
        paymentMethod: 'credit_card',
      },
      address: {
        id: enderecoDefault[0]._id,
        sendMethod: typoEnvioFormat,
      },
      products: produtosFormatados,
    };

      this.http.post(`${environment.API_ECOMMERCE}/order/process`, body)
      .pipe(
      tap((response: any) => console.log('response 1',response)), // Faz algo com a resposta sem modific?-la
      map(response => response['data']), // Extrai os dados da resposta
      catchError(error => {
        console.log('erro',error);
        return of(null); // Retorna um valor nulo se ocorrer um erro
      })
    )
    .toPromise()
    .then(response => {
      console.log('response',response); // Manipula a resposta da solicita??o POST como uma promessa
    });
  }

  pagamentoBoleto() {
    const productCarrinho = JSON.parse(localStorage.getItem('product') as any);
    const produtosFormatados = productCarrinho.map((p: any) => {
      return { code: p.code, quantity: p.qtd };
    });

    const enderecoDefault = JSON.parse(localStorage.getItem('enderecoDefault') as any);
    const typoEnvioFormat = JSON.parse(localStorage.getItem('typoEnvio') as any);

    const body = {
      payment: {
        paymentMethod: 'boletobancario',
      },
      address: {
        id: enderecoDefault[0]._id,
        sendMethod: typoEnvioFormat,
      },
      products: produtosFormatados,
    };

      this.http.post(`${environment.API_ECOMMERCE}/order/process`, body)
      .pipe(
      tap((response: any) => console.log('response 1',response)), // Faz algo com a resposta sem modific?-la
      map(response => response['data']), // Extrai os dados da resposta
      catchError(error => {
        console.log('erro',error);
        return of(null); // Retorna um valor nulo se ocorrer um erro
      })
    ).toPromise().then(response => {
      console.log('response',response); // Manipula a resposta da solicita??o POST como uma promessa
    });
  }

  removeProducts(product: any) {
    this.product = this.product.map((itemLIsta: any) => {
      if (itemLIsta.code === product.code && product.qtd > 1) {
        itemLIsta.qtd -= 1;
      }
      this.totalCarrinho();
      return itemLIsta;
    });
    localStorage.setItem('product', JSON.stringify(this.product))
  }

  addProducts(product: any) {
    this.product = this.product.map((itemLIsta: any) => {
      if (itemLIsta.code === product.code) {
        itemLIsta.qtd += 1;
      }
      this.totalCarrinho();
      return itemLIsta;
    });
    localStorage.setItem('product', JSON.stringify(this.product))
  }

  totalCarrinho() {
    let total = 0;
    this.product.forEach((itemLIsta: any) => {
      total += itemLIsta.price * itemLIsta.qtd;
      console.log('aaqui -> ',itemLIsta.qtd);
      this.total = total;
    });
    return total;
  }
}
