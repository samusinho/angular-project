import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { PartiesComponent } from './components/parties/parties.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PartyComponent } from './components/parties/party/party.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    PartiesComponent,
    PartyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    TableModule,
    DialogModule,
    DynamicDialogModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    PartyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
