import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './screens/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilComponent } from './screens/perfil/perfil.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { MenuPerfilComponent } from './components/menu-perfil/menu-perfil.component';
import { ModalAddressComponent } from './components/modal-address/modal-address.component';

// angular material
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { EditarEnderecoComponent } from './screens/editar-endereco/editar-endereco.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeAdminComponent } from './admin/screens/home-admin/home-admin.component';
import { SidebarComponent } from './admin/components/sidebar/sidebar.component';
import { TabelaUserComponent } from './admin/components/tabela-user/tabela-user.component';
import {MatTableModule} from '@angular/material/table';
import { CardAdminComponent } from './admin/components/card-admin/card-admin.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ListarProdutosComponent } from './admin/screens/screens/listar-produtos/listar-produtos.component';
import { CadastrarProdutoComponent } from './admin/screens/screens/cadastrar-produto/cadastrar-produto.component';
import { CuponsComponent } from './components/cupons/cupons.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ConfiguracaoAdminComponent } from './admin/screens/configuracao-admin/configuracao-admin.component';
import { ProdutoComponent } from './screens/produto/produto.component';
import { FormSettingsComponent } from './admin/screens/form-settings/form-settings.component';
import { CarrinhDeComprasComponent } from './screens/carrinho-de-compras/carrinho-de-compras.component';
import {MatStepperModule} from '@angular/material/stepper';
import { PagamentoComponent } from './screens/pagamento/pagamento.component';
import {MatInputModule} from '@angular/material/input';

import {MatTabsModule} from '@angular/material/tabs';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { CreditCardDirectivesModule } from 'angular-cc-library';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    HomeComponent,
    CarouselComponent,
    CardComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    PerfilComponent,
    MenuPerfilComponent,
    ModalAddressComponent,
    EditarEnderecoComponent,
    HomeAdminComponent,
    SidebarComponent,
    TabelaUserComponent,
    CardAdminComponent,
    ListarProdutosComponent,
    CadastrarProdutoComponent,
    CuponsComponent,
    ConfiguracaoAdminComponent,
    ProdutoComponent,
    FormSettingsComponent,
    CarrinhDeComprasComponent,
    PagamentoComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    MatStepperModule,
    SocialLoginModule,
    MatInputModule,
    CreditCardDirectivesModule,
    MatTabsModule,

    // MatMenuModule,
    // MatIconModule
  ],

  // providers: [
    // {
    //    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    // }
  // ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'triple-water-349101'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('705852731540516')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
