import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TemplateComponent} from "./core/template/container/template.component";
import {CraComponent} from "./features/cra/cra.component";
import {JustificatifsComponent} from "./features/justificatifs/justificatifs.component";
import {FicheDePaieComponent} from "./features/fiche-de-paie/fiche-de-paie.component";
import {ProfileInformationComponent} from "./features/profile-information/profile-information.component";

const routes: Routes = [
  {
    path: '', component: TemplateComponent,
    children: [
      {
        path: 'cra',
        component: CraComponent
      },
      {
        path: 'fiche-de-paie',
        component: FicheDePaieComponent
      },
      {
        path: 'justificatifs',
        component: JustificatifsComponent
      },
      {
        path : "profile-informations",
        component : ProfileInformationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
