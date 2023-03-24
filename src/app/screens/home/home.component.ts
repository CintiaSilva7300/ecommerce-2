import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
name: any;

  constructor(){
    this.name = '';
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')
    // this.name = localStorage.getItem('name')
    // this.name = localStorage.getItem('name')
    // this.name = localStorage.getItem('name')
  }


}
