import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass']
})
export class PerfilComponent implements OnInit {
  email!: any;
  name!: any;
  id: any
  genre: any;

  constructor(){
    this.id = '';
    this.name = '';
    this.email = '';
    this.genre = '';
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.genre = localStorage.getItem('genre');
    console.log('id: ',this.id,);
    console.log('email: ',this.email);
    console.log('name: ',this.name);
  }


}
