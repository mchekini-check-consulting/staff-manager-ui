import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestInterceptor } from './core/interceptors/HttpRequestInterceptor';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CraComponent,
    JustificatifsComponent,
    FicheDePaieComponent,
    DocumentationComponent,
    ProfileInformationComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
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
