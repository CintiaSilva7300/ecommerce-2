import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalProfileUserComponent } from './modal-profile-user/modal-profile-user.component';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.sass'],
})
export class ProfileUserComponent implements OnInit {
  user: any;

  birthDate = new Date();
  cpf: any;
  email: any;
  genre: any;
  name: any;
  id: any;

  constructor(private router: Router, private http: HttpClient,public dialog: MatDialog) {
    this.user = this.router.getCurrentNavigation()?.extras.state;

    if (this.user) {
      this.birthDate = this.user.birthDate;
      this.cpf = this.user.cpf;
      this.email = this.user.email;
      this.genre = this.user.genre;
      this.name = this.user.name;
    }
  }

  ngOnInit(): void {
    console.log('chegou os dados', this.user);
  }

  openDialog(id: any) {
    this.dialog.open(ModalProfileUserComponent, {
      data: {id: id},
    }); //abre o mordal do componente ModalProfileUserComponent
    console.log('id ->',id)
  }

  voltar() {
    this.router.navigate(['/admin/users']);
  }
}
