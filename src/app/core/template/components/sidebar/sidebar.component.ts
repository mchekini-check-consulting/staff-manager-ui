import {Component, OnInit} from '@angular/core';
import {AppDetailsService} from "../../../service/app-details-service";
import {filter} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/cra', title: 'Compte Rendu D\'Activité ', icon: 'nc-icon nc-ruler-pencil', class: ''},
  {path: '/fiche-de-paie', title: 'Fiche de paie', icon: 'nc-icon nc-layers-3', class: ''},
  {path: '/justificatifs', title: 'Upload des Justificatifs', icon: 'nc-icon nc-cloud-upload-94', class: ''},
  {path: '/profile-informations', title: 'Mes Informations', icon: 'nc-icon nc-single-copy-04', class: ''},
  {path: '/documentation', title: 'Documentation', icon: 'nc-icon nc-single-copy-04', class: ''},
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: RouteInfo[] = [];
  version = "";

  constructor(private appDetails: AppDetailsService, private oauthService: OAuthService) {
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        // @ts-ignore
        this.appDetails.getAppDetails().subscribe(response => {
          this.version = response.version;
        })
      });

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.appDetails.getAppDetails().subscribe(response => {
      this.version = response.version;
    })
  }

}
