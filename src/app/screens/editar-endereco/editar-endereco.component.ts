import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
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
id:any

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
name: any
messageError: any;

  constructor(
    private http: HttpClient,
    private userService: UserService
    ){
    this.loading = false;

   this.zipCode = '';
   this.street = '';
   this.number = ''
   this.neighborhood = '';
   this.city = '';
   this.uf = '';
   this.complement = '';
   this.messageError = "";
  }

  ngOnInit(): void {
      // this.http
      //   .get(`${environment.API_ECOMMERCE}/address/user` ).subscribe((res: any) => {
      //     this.address = res
      //     console.log(res)
      //   })
  }


  atualizarEndereco(data: any) {
    this.loading = true;
    this.http.put(`${environment.API_TESTE}/address/`, data.id).subscribe((result: any) => {
      this.loading = false;
      console.log('data ',data)
      this.ngOnInit()
    }, err => {
      this.messageError = err.error.message
      this.loading = false;
    });
    // this.userService.updateAddress(this._id).subscribe((result: any) => {
    //   console.log('result ',result)
    // })
  }

}

