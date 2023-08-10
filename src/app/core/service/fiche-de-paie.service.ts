import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FicheDePaie, FicheDePaiePostBody } from '../model/fiche-de-paie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FicheDePaieService {
  private apiUrl = '/api/v1/paysheet/search';
  private dlUrl = '/api/v1/paysheet/';

  constructor(private http: HttpClient) {}

  getFichesDePaie(body: FicheDePaiePostBody): Observable<FicheDePaie[]> {
    return this.http.post<FicheDePaie[]>(this.apiUrl, body);
  }

  downloadFicheDePaie(name: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/octet-stream',
      }),
      responseType: 'arraybuffer' as 'json',
    };

    return this.http.get<ArrayBuffer>(this.dlUrl + name, options);
  }
}
