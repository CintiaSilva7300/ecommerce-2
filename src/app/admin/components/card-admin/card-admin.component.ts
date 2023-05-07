import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrls: ['./card-admin.component.sass']
})
export class CardAdminComponent implements OnInit{
userLength: any;

  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void{
    this.http.get(`${environment.API_ECOMMERCE}/user`).subscribe((data: any) =>{
      this.userLength = data.length;
      console.log('data',this.userLength)
    })
  }
}

