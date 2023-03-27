import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.sass']
})
export class CuponsComponent {
@Input() infoUser: any; //recebe o dado externo de outro componente

}
