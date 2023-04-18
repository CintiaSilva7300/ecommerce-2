import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.sass']
})
export class FormSettingsComponent implements OnInit {
key!: string;
value!: string
metaDatas!: any[];
config!: any
name: any
code: any
description: any
type:any
id: any

  constructor(
    private http: HttpClient, private router: Router,
    ){
      this.name = '';
      this.code = '';
      this.description = '';

      this.metaDatas = [];

      this.config = this.router.getCurrentNavigation()?.extras.state

      console.log(this.config)
      if(this.config){
        this.metaDatas = this.config.metadatas;
        this.id = this.config._id;
        this.name = this.config.name
        this.description = this.config.description;
        this.code = this.config.code
        this.type = this.config.type
      }
    }

  ngOnInit(): void {}

  cadastrarConfiguracion(body: any): void {
    if(this.id){
      body.metadatas = this.metaDatas
      this.http.put(`${environment.API_ECOMMERCE}/setting/${this.id}`, body).subscribe((res: any )=> {
        console.log(res)
      })
    }else{
      body.metadatas = this.metaDatas
      this.http.post(`${environment.API_ECOMMERCE}/setting`, body).subscribe((res: any )=> {
        console.log(res)
      })
    }
  }

  adicionarNaLista(){
    this.metaDatas.push({key: this.key, value: this.value})
    this.key = '';
    this.value = '';
    console.log(this.metaDatas)
  }

  deleteMetaData(metedata: any){
   this.metaDatas = this.metaDatas.filter( item => item.key !== metedata.key && item.value !== metedata.value)
    console.log(this.metaDatas)
  }
}
