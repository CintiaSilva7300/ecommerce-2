import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'editarEndereco',
  templateUrl: './editar-endereco.component.html',
  styleUrls: ['./editar-endereco.component.sass']
})
export class EditarEnderecoComponent implements OnInit {

loading: any;
_id:any

name: any;
zipCode: any;
street:any;
number: any;
neighborhood:any;
city:any;
uf:any;
complement: any
address: any
users: any

  constructor(private http: HttpClient){
    this.loading = false;

   this.name = '';
   this.zipCode = '';
   this.street = '';
   this.number = ''
   this.neighborhood = '';
   this.city = '';
   this.uf = '';
   this.complement = '';

  }

  ngOnInit(): void {
      this.http
        .get(`${environment.API_TESTE}/address/user` ).subscribe((res: any) => {
          this.address = res
          // console.log('id -> ', this.address)
        })
  }


  atualizarEndereco(data: any) {
    this.loading = true;

    this.http.put(`${environment.API_TESTE}/address/`, data).subscribe((result: any) => {

    console.log('result -> ', data.id)

      this.loading = false;
      this.ngOnInit()
    }, error => {
     console.log('ERROR',error)
     this.loading = false;
    });
  }

}
