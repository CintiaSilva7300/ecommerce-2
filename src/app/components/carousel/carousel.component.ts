import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
carrosel: any
  constructor(
    private http: HttpClient
    ){
  }

  ngOnInit(): void {
    this.http.get(`${environment.API_ECOMMERCE}/setting/12778`).subscribe((data) => {
      this.carrosel = data
    })
  }
}
