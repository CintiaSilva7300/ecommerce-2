import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracao-admin',
  templateUrl: './configuracao-admin.component.html',
  styleUrls: ['./configuracao-admin.component.sass']
})
export class ConfiguracaoAdminComponent implements OnInit {
length = 1;
pageSize = 10;
pageIndex = 0;
pageSizeOptions = [5, 10, 25];
pageEvent!: PageEvent;
configPaginated!: any[];
loading: any;
config: any

handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.pageIndex = e.pageIndex;
  this.pageSize = e.pageSize;
  this.configPaginated = this.config.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
}

constructor(
  private http: HttpClient,
  private router: Router,

){
  this.loading = false;
}

ngOnInit(): void {
  this.loading = true;

  this.http
    .get(`${environment.API_ECOMMERCE}/setting`).subscribe((data) => {
      console.log(data);
      this.config = data

      this.length = this.config.length
          this.configPaginated = this.config.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
          this.loading = false;
        })

}


async excluirConfiguracao(id: any) {
  this.http.delete(`${environment.API_ECOMMERCE}/product/${id}`).subscribe((resposta: any) => {
    this.ngOnInit()
    console.log(resposta)
  }, err => {
    console.log('errroooo',err)
  })
}

alertWithSuccessExcluirConfiguracao(id: any){
  Swal.fire({
    title: 'Esse produto será excluirdo?',
    text: 'Essa ação não será revertida!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, delete!',
    cancelButtonText: 'Não, cancela!',
  }).then(async (result) => {
    if (result.value) {
      await this.excluirConfiguracao(id)
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

editarConfiguracao(config: any){
  this.router.navigate(['/admin/settings'], {state: config});
}
}
