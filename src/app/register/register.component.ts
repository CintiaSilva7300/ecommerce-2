import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit{
loading: any;
messageError: any;

  constructor(private http: HttpClient){
    this.loading = false;
    this.messageError = "";
  }

  ngOnInit(): void {

  }

  save(data: any) {
    this.loading = true;

    console.log("form data", data);

    this.http.post(`${environment.API_TESTE}`, data).subscribe((result) => {
      console.log('result',result);
      console.log('birthDate', data.birthDate);

      this.loading = false;
    },err => {
      console.log(err.error.message)
      this.messageError = err.error.message
      this.loading = false;
    });
    console.log('data',data);
  }

}
