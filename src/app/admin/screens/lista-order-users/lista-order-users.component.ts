import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ModalStatusOrderComponent } from './modal-status-order/modal-status-order.component';

@Component({
  selector: 'app-lista-order-users',
  templateUrl: './lista-order-users.component.html',
  styleUrls: ['./lista-order-users.component.sass']
})
export class ListaOrderUsersComponent implements OnInit {
ordersPaginated!: any[];
inputPesquisa: string = '';
order: any
configStatus: any

length = 1;
pageSize = 10;
pageIndex = 0;
pageSizeOptions = [5, 10, 25];
pageEvent!: PageEvent;
loading: any;

handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.pageIndex = e.pageIndex;
  this.pageSize = e.pageSize;
  this.ordersPaginated = this.order.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
}


constructor(private http: HttpClient,public dialog: MatDialog){
  this.loading = false;
}

ngOnInit(): void {
  this.http
  .get(`${environment.API_ECOMMERCE}/order` ).subscribe((resposta: any) => {
    this.order = resposta
    console.log(resposta)


    this.length = this.order.length
    this.ordersPaginated = this.order.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
    this.loading = false;
    // this.permission = localStorage.getItem('permission')?.includes('ADMIN');
  })
  this.getConfigStatus()
}

filtrarProduto() {
  if (this.inputPesquisa.length > 1) {
    this.ordersPaginated = this.ordersPaginated.filter((search: any) =>
      search.user.name.toLowerCase().includes(this.inputPesquisa.toLowerCase())
    );
  } else {
    return this.ngOnInit()
  }
}

getConfigStatus() {
  this.http.get(`${environment.API_ECOMMERCE}/setting/SETTING_STATUS_ORDER`).subscribe((status) => {
    this.configStatus = status
    console.log('aaaaaaaaaaaaaaaaaaa -> ', this.configStatus.metadatas)
})
}

openDialog(id: any) {
  this.dialog.open(ModalStatusOrderComponent, {//abre o mordal do componente ModalStatusOrderComponent
    data: {id: id},
  });
  console.log('id orders ->',id)
}

formatPrice(price: number) {
  return price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}
}
