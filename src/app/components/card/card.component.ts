import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
product!: any[]
loading: any;

  constructor(
    private http: HttpClient
    ){
      this.loading = false;
    }

  ngOnInit(): void {
    this.loading = true;
    this.http
    .get(`${environment.API_TESTE}/product/` ).subscribe((resposta: any) => {
      this.product = resposta;
      console.log('qqq',resposta)
      this.loading = false;
    })
  }


}
