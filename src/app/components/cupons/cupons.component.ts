import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.sass']
})
export class CuponsComponent implements OnInit {
@Input() infoUser: any; //recebe o dado externo de outro componente

constructor(){

}

ngOnInit(): void {
}
}
