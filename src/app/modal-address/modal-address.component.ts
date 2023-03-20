import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'modalAddress',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.sass']
})
export class ModalAddressComponent implements OnInit {
loading: any;
@Input()showModal: any;
messageError: any;

  constructor(private http: HttpClient){
    this.showModal = false;
  }

  ngOnInit(): void {}

  save(data: any) {
    this.loading = true;
    this.http.post(`${environment.API_TESTE}/address/register`, data).subscribe((result: any) => {
        this.loading = false;
        this.showModal = false

        window.location.reload();

    },err => {
      console.log(err.error.message)
      this.messageError = err.error.message
      this.loading = false;
    });
  }

  closeModal() {
    this.showModal = false;
    return window.location.reload();
  }
}
