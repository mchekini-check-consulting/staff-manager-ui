import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TemplateComponent} from './core/template/container/template.component';
import {FooterComponent} from './core/template/components/footer/footer.component';
import {NavbarComponent} from './core/template/components/navbar/navbar.component';
import {SidebarComponent} from './core/template/components/sidebar/sidebar.component';
import {CraComponent} from './features/cra/cra.component';
import {JustificatifsComponent} from './features/justificatifs/justificatifs.component';
import {FicheDePaieComponent} from './features/fiche-de-paie/fiche-de-paie.component';
import {DocumentationComponent} from './features/documentation/documentation.component';
import {ProfileInformationComponent} from './features/profile-information/profile-information.component';
import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc";

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
