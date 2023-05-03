import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-status-order',
  templateUrl: './modal-status-order.component.html',
  styleUrls: ['./modal-status-order.component.sass']
})
export class ModalStatusOrderComponent implements OnInit{
configStatus: any
id: any

  constructor(private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}
    ngOnInit(): void {
      this.id = this.data.id;
    this.getConfigStatus()
  }

  getConfigStatus() {
    this.http.get(`${environment.API_ECOMMERCE}/setting/SETTING_STATUS_ORDER`).subscribe((status: any) => {
      this.configStatus = status.metadatas
  })}

  atualizarStatus(body: any) {
    body.status
    this.http.put(`${environment.API_ECOMMERCE}/order/status/${this.id}`, body).subscribe((status: any) => {
      this.getConfigStatus()

  })}
}
