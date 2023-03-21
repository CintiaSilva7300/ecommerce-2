import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationRoutesService {
authorization = false;

  constructor() { }

  statusLogin = () => !!localStorage.getItem('token')
  //se tiver logado tera o token "usuario está autorizadso a acessar a rota"
}
