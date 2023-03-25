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
import { SidebarComponent } from './admin/componets/sidebar/sidebar.component';
import { TabelaUserComponent } from './admin/componets/tabela-user/tabela-user.component';
import {MatTableModule} from '@angular/material/table';
import { CardAdminComponent } from './admin/componets/card-admin/card-admin.component';
import {MatPaginatorModule} from '@angular/material/paginator';
//admin
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
    MatPaginatorModule
  ],
  providers: [HttpClient,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
