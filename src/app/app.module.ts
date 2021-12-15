import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/template/header/header.component';
import { FooterComponent } from './public/template/footer/footer.component';
import { NotFoundComponent } from './public/errors/not-found/not-found.component';
import { InternalServerErrorComponent } from './public/errors/internal-server-error/internal-server-error.component';
import { NavbarComponent } from './public/template/navbar/navbar.component';
import { HomeComponent } from './public/general/home/home.component';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from '@angular/forms';

>>>>>>> main
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    HttpClientModule
=======
    HttpClientModule,
    ReactiveFormsModule
>>>>>>> main
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
