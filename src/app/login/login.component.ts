import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment"
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { UserLogin } from '../interface/userLogin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    public fb: FormBuilder,
    ){;
    }

  ngOnInit(): void {}


}
