import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { RegisterComponent } from './screens/register/register.component';
import { PerfilComponent } from './screens/perfil/perfil.component';
import { AuthorizedRoutesGuard } from './_guard/authorized-routes.guard';
import { LoginComponent } from './screens/login/login.component';
import { EditarEnderecoComponent } from './screens/editar-endereco/editar-endereco.component';
import { HomeComponent } from './screens/home/home.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  // {
  //   path: 'admin', component: HomeComponent
  // },
  {
    path: 'perfil', component: PerfilComponent,
    canActivate:[AuthorizedRoutesGuard]
  },

  {
    path: 'editarEndereco', component: EditarEnderecoComponent,
    canActivate:[AuthorizedRoutesGuard]
  },

  {
    path: '', component: HomeComponent
  },

  {
    path: '**', pathMatch: 'full',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
