import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
product!: any[]

  constructor(
    private http: HttpClient
    ){}

  ngOnInit(): void {
    this.http
    .get(`${environment.API_TESTE}/product/` ).subscribe((resposta: any) => {
      this.product = resposta

      console.log(this.product)
    })
  }


}
