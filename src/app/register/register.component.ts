import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit{

  constructor(private http: HttpClient){}

  ngOnInit(): void {

  }

  save(data: any) {

    console.log("form data", data);

    this.http.post(`${environment.API_TESTE}`, data).subscribe((result) => {
      console.log('result',result);
      console.log('birthDate', data.birthDate);

    });
    console.log('data',data);
  }

}
