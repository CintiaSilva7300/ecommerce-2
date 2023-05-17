import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.sass']
})
export class ListarProdutosComponent implements OnInit {
inputPesquisa: string = '';
length = 1;
pageSize = 10;
pageIndex = 0;
pageSizeOptions = [5, 10, 25];
pageEvent!: PageEvent;
usersPaginated!: any[];
product!: any[];
loading: any;

handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.pageIndex = e.pageIndex;
  this.pageSize = e.pageSize;
  this.usersPaginated = this.product.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
}

  constructor(
    private http: HttpClient,
    public userService: UserService,
    private router: Router
  ){
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;

    this.http
    .get(`${environment.API_ECOMMERCE}/product/` ).subscribe((resposta: any) => {
      this.product = resposta

      this.length = this.product.length
      this.usersPaginated = this.product.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
      this.loading = false;
    })
  }

  async excluirProduto(id: any) {
    this.http.delete(`${environment.API_ECOMMERCE}/product/${id}`).subscribe((resposta: any) => {
      this.ngOnInit()
      console.log(resposta)
    }, err => {
      console.log('errroooo',err)
    })
  }

  alertWithSuccessExcluirProduto(id: any){
    Swal.fire({
      title: 'Esse produto será excluirdo?',
      text: 'Essa ação não será revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete!',
      cancelButtonText: 'Não, cancela!',
    }).then(async (result) => {
      if (result.value) {
        await this.excluirProduto(id)
        Swal.fire(
          'Deletado!',
          'Esee produto foi deletado',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Esee produto permanecera ativo!',
          'error'
        )
      }
    })
  }

  filtrarProduto() {
    this.http.get(`${environment.API_ECOMMERCE}/product/` ).subscribe((resposta: any) => {
      this.product = resposta
      if (this.inputPesquisa.length > 0) {
        this.product = this.product.filter((search: any) =>
          search.name.toLowerCase().includes(this.inputPesquisa.toLowerCase())
        )
      } else if(this.inputPesquisa.length == 1){
        this.product;
      }
    })
  }

  goToPageEdit(product: any): void {
    this.router.navigate(['admin/cadastrarProduto'], {state: product});
  }

  formatPrice(price: number) {
    return price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
