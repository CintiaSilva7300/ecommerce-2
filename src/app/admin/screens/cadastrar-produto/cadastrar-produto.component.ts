import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.sass']
})
export class CadastrarProdutoComponent implements OnInit {
loading: any;

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {

  }

  cadastrarProduto(data: any) {
    this.loading = true;
    this.http.post(`${environment.API_ECOMMERCE}/product`, data).subscribe((result: any) => {
      console.log('result -> ',result)

      this.loading = false;
    },err => {
      console.log(err.error.message)
      this.loading = false;
    });
  }
}
