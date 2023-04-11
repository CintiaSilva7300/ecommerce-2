import { HttpClient } from '@angular/common/http';
import { literalMap } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrinh-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.sass'],
})
export class CarrinhDeComprasComponent implements OnInit {
  products!: any;
  total: number = 0;
  qtd: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {
    const productLocalStorage = localStorage.getItem('product');
    this.products = JSON.parse(productLocalStorage as any);
    this.products = this.products.map((product: any) => {

    product.qtd = 1;

    return product;
    });

    this.totalCarrinho();
    // console.log('aqui ->',this.products);
  }

  addProducts(product: any) {
    this.products = this.products.map((itemLIsta: any) => {
      if (itemLIsta.code === product.code) {
        itemLIsta.qtd += 1;
      }

      this.totalCarrinho();
      return itemLIsta;
    });
  }

  removeProducts(product: any) {
    this.products = this.products.map((itemLIsta: any) => {
      if (itemLIsta.code === product.code && product.qtd > 1) {
        itemLIsta.qtd -= 1;
      }
      this.totalCarrinho();
      return itemLIsta;
    });
  }

  totalCarrinho() {
    let total = 0;

    this.products.forEach((itemLIsta: any) => {
      total += itemLIsta.price * itemLIsta.qtd;
      this.total = total;

      // console.log(total);
    });
    return total;
  }

  formatPrice(price: number) {
    return price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  navegandoParaTelaPagemnto(){
    this.router.navigate(['/pagamento'], {state: [{product: this.products, total: this.total}]});

  //função que pegar os dados do componente atual e manda para o componente de pagamento
  }
}
