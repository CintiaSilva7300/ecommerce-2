import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { UserCreate } from '../interface/userCreate';
import { Observable, catchError } from 'rxjs';
import { UserLogin } from '../interface/userLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

auth_token = `
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTUwOWE4N2Y3YWFiOTBlMjM3ZTIyMyIsImVtYWlsIjoiY2ludGlhc2lsdmE3MzAwQGdtYWlsLmNvbSIsIm5hbWUiOiJDaW50aWEgU2lsdmEiLCJpYXQiOjE2NzkxMDAzMzB9.9i3AQb19NJm9MigOsTa62A5dViH40KlQAjyRLOu6_Dw
`;

headers = new HttpHeaders({
'Authorization': `Bearer ${this.auth_token}`
});

requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) {
    // this.getUserToken()
  }

  create(user: UserCreate): Observable<UserCreate> {
    return this.http
      .post<UserCreate>(`${environment.API_TESTE}/user/register`, user)
  }

  login(user: UserLogin): Observable<any> {
    let api = `${environment.API_TESTE}/user/login`;
    return this.http.post(api, user).pipe();
}

  getUserToken(){
    return this.http.get<any[]>(`${environment.API_TESTE}/user/userData`);
  }

  statusLogin = () => !!localStorage.getItem('token')



}
