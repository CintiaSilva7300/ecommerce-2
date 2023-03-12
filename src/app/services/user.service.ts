import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { UserCreate } from '../interface/userCreate';
import { Observable, catchError } from 'rxjs';
import { UserLogin } from '../interface/userLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  create(user: UserCreate): Observable<UserCreate> {
    return this.http
      .post<UserCreate>(`${environment.API_TESTE}`, user)
  }

  login(user: UserLogin): Observable<any> {
    let api = `${environment.API_TESTE}/login`;
    return this.http.post(api, user).pipe();
}
}
