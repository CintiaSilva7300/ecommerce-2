import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { environment } from 'src/environments/environment';
import {PageEvent} from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabela-user',
  templateUrl: './tabela-user.component.html',
  styleUrls: ['./tabela-user.component.sass']
})
export class TabelaUserComponent implements OnInit {
users!: any[];
usersPaginated!: any[];
messageError: any

length = 1;
pageSize = 10;
pageIndex = 0;
pageSizeOptions = [5, 10, 25];
pageEvent!: PageEvent;



handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.pageIndex = e.pageIndex;
  this.pageSize = e.pageSize;
  this.usersPaginated = this.users.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
}

  constructor(private http: HttpClient){
    this.messageError = '';
  }

ngOnInit(): void {
  this.http
    .get(`${environment.API_TESTE}/user` ).subscribe((resposta: any) => {
      this.users = resposta
      this.length = this.users.length
      this.usersPaginated = this.users.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
    })
}

async excluirUsuario(id: any) {
  this.http.delete(`${environment.API_TESTE}/user/${id}`).subscribe((resposta: any) => {
    this.ngOnInit()
    console.log(resposta)
  }, err => {
    this.messageError = err.error.message
    console.log('errroooo',err)
  })
}

alertWithSuccess(id: any){
  Swal.fire({
    title: 'Are you sure want to remove?',
    text: 'You will not be able to recover this file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then(async (result) => {
    if (result.value) {
      await this.excluirUsuario(id)
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
}
}
