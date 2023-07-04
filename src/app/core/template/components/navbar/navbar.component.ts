import {Component} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {filter} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public name = '';

  constructor(private oauthService: OAuthService) {

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        // @ts-ignore
        this.name = this.oauthService.getIdentityClaims()['name'];
      });

    if (this.oauthService.hasValidIdToken()) {
      // @ts-ignore
      this.name = this.oauthService.getIdentityClaims()['name'];
    }

  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
  }
}
