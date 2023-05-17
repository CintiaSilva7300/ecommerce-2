import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { RegisterComponent } from './screens/register/register.component';
import { PerfilComponent } from './screens/perfil/perfil.component';
import { AuthorizedRoutesGuard } from './_guard/authorized-routes.guard';
import { LoginComponent } from './screens/login/login.component';
import { EditarEnderecoComponent } from './screens/editar-endereco/editar-endereco.component';
import { HomeComponent } from './screens/home/home.component';
import { HomeAdminComponent } from './admin/screens/home-admin/home-admin.component';
import { CardAdminComponent } from './admin/components/card-admin/card-admin.component';
import { ListarProdutosComponent } from './admin/screens/listar-produtos/listar-produtos.component';
import { CadastrarProdutoComponent } from './admin/screens/cadastrar-produto/cadastrar-produto.component';
import { ConfiguracaoAdminComponent } from './admin/screens/configuracao-admin/configuracao-admin.component';
import { ProdutoComponent } from './screens/produto/produto.component';
import { FormSettingsComponent } from './admin/screens/form-settings/form-settings.component';
import { PagamentoComponent } from './screens/pagamento/pagamento.component';
import { ListaOrderUsersComponent } from './admin/screens/lista-order-users/lista-order-users.component';
import { CuponsComponent } from './components/cupons/cupons.component';
import { ProfileUserComponent } from './admin/screens/profile-user/profile-user.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'product/:code', component: ProdutoComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'pagamento', component: PagamentoComponent
  },
  {
    path: 'admin/users', component: HomeAdminComponent
  },
  {
    path: 'admin/settings', component: FormSettingsComponent
  },
   {
    path: 'admin/home', component: CardAdminComponent
  },
  {
    path: 'admin/listarProdutos', component: ListarProdutosComponent
  },
  {
    path: 'admin/cadastrarProduto', component: CadastrarProdutoComponent
  },
  {
    path: 'admin/configuracao', component: ConfiguracaoAdminComponent
  },
  {
    path: 'admin/perfil-user', component: ProfileUserComponent
  },
  {
    path: 'admin/listaOrders', component: ListaOrderUsersComponent
  },
  {
    path: 'cupons', component: CuponsComponent
  },
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
