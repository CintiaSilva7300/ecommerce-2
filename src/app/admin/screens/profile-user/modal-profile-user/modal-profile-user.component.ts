import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-profile-user',
  templateUrl: './modal-profile-user.component.html',
  styleUrls: ['./modal-profile-user.component.sass']
})
export class ModalProfileUserComponent implements OnInit {
id:any;
dialog: any;
user: any;
amount: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      this.user = this.router.getCurrentNavigation()?.extras.state;

    }

  ngOnInit(): void {
    this.id = this.data.id;
    console.log('id',this.id);
  }

  linkPagamento(body: any) {
    console.log('linkPagamento',body)
    this.http
      .post(`${environment.API_ECOMMERCE}/order/processLinkPayment/`, body)
      .subscribe((res: any) => {
        this.data;
        console.log('opaaaaaaaaaaaaaa',  res);
      });
  }
}

