import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {PageEvent} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-user',
  templateUrl: './tabela-user.component.html',
  styleUrls: ['./tabela-user.component.sass']
})

export class TabelaUserComponent implements OnInit {
inputPesquisa: string = '';
usersPaginated!: any[];
users!: any[];
iconPerfil: string;
messageError: any

length = 1;
pageSize = 10;
pageIndex = 0;
pageSizeOptions = [5, 10, 25];
pageEvent!: PageEvent;
permission: any;
loading: any;
disabled = new FormControl(false);

handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.pageIndex = e.pageIndex;
  this.pageSize = e.pageSize;
  this.usersPaginated = this.users.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
}

  constructor(
    private http: HttpClient,
    public userService: UserService,
    private router: Router
    ){
    this.loading = false;
    this.messageError = '';


    this.iconPerfil = '/assets/img/usuario-de-perfil.png';
  }

ngOnInit(): void {
  this.loading = true;

  this.http
    .get(`${environment.API_ECOMMERCE}/user` ).subscribe((resposta: any) => {
      this.users = resposta

      this.length = this.users.length
      this.usersPaginated = this.users.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
      this.loading = false;
      // this.permission = localStorage.getItem('permission')?.includes('ADMIN');
    })
}

async excluirUsuario(id: any) {
  this.http.delete(`${environment.API_ECOMMERCE}/user/${id}`).subscribe((resposta: any) => {
    this.ngOnInit()
    console.log(resposta)
  }, err => {
    this.messageError = err.error.message
    console.log('errroooo',err)
  })
}

async tonarUserAdmin(id: any) {
  this.http.post(`${environment.API_ECOMMERCE}/user/setAdminInUser/${id}`, id).subscribe((result: any) => {
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
    title: 'Deseja tornar este usuario admiministrador',
    text: 'Ele terá acesso de administrador!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, tornar-lo admin!',
    cancelButtonText: 'Não, cancela'
  }).then(async (result) => {
    if (result.value) {
      await this.tonarUserAdmin(id)
      Swal.fire(
        'Sucesso!',
        'Essa conta foi alterada para ser admin.',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Ação cancelada!',
        'Essa conta não foi modificada.',
        'success'
      )
    }
  })
}

filtrarProduto() {
  this.http.get(`${environment.API_ECOMMERCE}/user` ).subscribe((resposta: any) => {
    this.users = resposta

    if (this.inputPesquisa.length > 1) {
      this.users = this.users.filter((search: any) =>
        search.name.toLowerCase().includes(this.inputPesquisa.toLowerCase()) ||
        search.cpf.toLowerCase().includes(this.inputPesquisa.toLowerCase()) ||
        search.email.toLowerCase().includes(this.inputPesquisa.toLowerCase())
      );

    }
    else {
       this.users;
    }
  })
}
async goToProfileUser(id: any){
  this.http
    .get(`${environment.API_ECOMMERCE}/user/${id}` ).subscribe((resposta: any) => {
      if(resposta){
        this.router.navigate(['/admin/perfil-user'], {
          state:  resposta ,
        });
      }
      return;
    })

}
}

