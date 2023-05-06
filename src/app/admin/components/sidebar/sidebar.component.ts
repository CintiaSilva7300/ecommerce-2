import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
showFiller = true;
flag!: boolean;

  openSidebar(){
    this.flag = !this.flag;
  }
}
