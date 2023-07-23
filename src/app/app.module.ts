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

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ErrorDialogComponent } from './core/template/components/error-dialog/error-dialog.component';
import { FooterComponent } from './core/template/components/footer/footer.component';
import { NavbarComponent } from './core/template/components/navbar/navbar.component';
import { SidebarComponent } from './core/template/components/sidebar/sidebar.component';
import { SuccessDialogComponent } from './core/template/components/success-dialog/success-dialog.component';

import { TemplateComponent } from './core/template/container/template.component';
import { CraComponent } from './features/cra/cra.component';
import { DocumentationComponent } from './features/documentation/documentation.component';
import { FicheDePaieComponent } from './features/fiche-de-paie/fiche-de-paie.component';
import { JustificatifsComponent } from './features/justificatifs/justificatifs.component';
import { ProfileInformationComponent } from './features/profile-information/profile-information.component';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CreateCraModalComponent } from './core/template/components/create-cra-modal/create-cra-modal.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FileInputComponent } from './core/template/components/file-input/file-input.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const ANGULAR_MATERIAL = [
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
];
const COMPONENTS = [
  FooterComponent,
  SidebarComponent,
  ErrorDialogComponent,
  SuccessDialogComponent,
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
  CreateCraModalComponent,
  FileInputComponent,
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
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
