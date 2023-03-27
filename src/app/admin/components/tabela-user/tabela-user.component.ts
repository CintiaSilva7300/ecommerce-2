import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Type } from '@angular/core';
import { environment } from 'src/environments/environment';
import {PageEvent} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-tabela-user',
  templateUrl: './tabela-user.component.html',
  styleUrls: ['./tabela-user.component.sass']
})
export class TabelaUserComponent implements OnInit {
users!: any;
usersPaginated!: any[];
messageError: any

length = 1;
pageSize = 10;
pageIndex = 0;
pageSizeOptions = [5, 10, 25];
pageEvent!: PageEvent;
permission: any;
loading: any;
disabled = new FormControl(false);

@Input() inputPesquisa: string = '';

handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.pageIndex = e.pageIndex;
  this.pageSize = e.pageSize;
  this.usersPaginated = this.users.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
}

  constructor(
    private http: HttpClient,
    public userService: UserService
    ){
    this.loading = false;
    this.messageError = '';
  }

ngOnInit(): void {
  this.loading = true;

  this.http
    .get(`${environment.API_TESTE}/user` ).subscribe((resposta: any) => {
      this.users = resposta


      this.length = this.users.length
      this.usersPaginated = this.users.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
      this.loading = false;
      // this.permission = localStorage.getItem('permission')?.includes('ADMIN');
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

async tonarUserAdmin(id: any) {
  this.http.post(`${environment.API_TESTE}/user/setAdminInUser/${id}`, id).subscribe((result: any) => {
    console.log('result -> ',result)
    this.ngOnInit()
  }, err => {
    this.messageError = err.error.message
  });
}

alertWithSuccessExcluirUser(id: any){
  Swal.fire({
    title: 'Esse usuario será excluirdo?',
    text: 'Essa ação não será revertida!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then(async (result) => {
    if (result.value) {
      await this.excluirUsuario(id)
      Swal.fire(
        'Deletado!',
        'Esee usuario foi deletado',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Esee usuario permanecera ativo!',
        'error'
      )
    }
  })
}

alertWithSuccessTornarAdminUser(id: any){
  Swal.fire({
    title: 'Are you sure want to remove?',
    text: 'You will not be able to recover this file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then(async (result) => {
    if (result.value) {
      await this.tonarUserAdmin(id)
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

getSearch(name: any) {
  if (name) {
    name = name.toUpperCase();

    this.users = this.users.filter((a: { nome: any; }) =>
          a.nome.toUpperCase().indexOf(name) >= 0
      );
  }
  console.log(name);
}

}
