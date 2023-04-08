import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'editarEndereco',
  templateUrl: './editar-endereco.component.html',
  styleUrls: ['./editar-endereco.component.sass']
})
export class EditarEnderecoComponent implements OnInit {
@Input()showModal: any;

loading: any;
_id:any

@Input()addressSelected: any;
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
        .get(`${environment.API_ECOMMERCE}/address/user` ).subscribe((res: any) => {
          this.address = res
          console.log(res)
        })
  }


  atualizarEndereco(data: any) {
   console.log(data)

   this.http.put(`${environment.API_ECOMMERCE}/address/${data.id}`, data).subscribe((res: any) => {console.log(res.id)})
}

}
