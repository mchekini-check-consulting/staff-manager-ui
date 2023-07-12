import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestInterceptor } from './core/interceptors/HttpRequestInterceptor';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ErrorDialogComponent } from './core/template/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './core/template/components/success-dialog/success-dialog.component';
import { FooterComponent } from './core/template/components/footer/footer.component';
import { ModalComponent } from './core/template/components/modal/modal.component';
import { NavbarComponent } from './core/template/components/navbar/navbar.component';
import { SidebarComponent } from './core/template/components/sidebar/sidebar.component';

import { TemplateComponent } from './core/template/container/template.component';
import { CraComponent } from './features/cra/cra.component';
import { DocumentationComponent } from './features/documentation/documentation.component';
import { FicheDePaieComponent } from './features/fiche-de-paie/fiche-de-paie.component';
import { JustificatifsComponent } from './features/justificatifs/justificatifs.component';
import { ProfileInformationComponent } from './features/profile-information/profile-information.component';

const ANGULAR_MATERIAL = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatIconModule,
  MatNativeDateModule,
];
const COMPONENTS = [
  FooterComponent,
  SidebarComponent,
  ErrorDialogComponent,
  SuccessDialogComponent,
  FooterComponent,
  ModalComponent,
  NavbarComponent,
  SidebarComponent,
];
const PAGES = [
  TemplateComponent,
  DocumentationComponent,
  CraComponent,
  FicheDePaieComponent,
  JustificatifsComponent,
  ProfileInformationComponent,
];
@NgModule({
  declarations: [AppComponent, ...COMPONENTS, ...PAGES],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ...ANGULAR_MATERIAL,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
