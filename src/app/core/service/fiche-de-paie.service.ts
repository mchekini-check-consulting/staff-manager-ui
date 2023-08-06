import { HttpClient } from '@angular/common/http';
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

  downloadFicheDePaie(name: string): Observable<Blob> {
    const options = { responseType: 'blob' as 'json' };
    return this.http.get<Blob>(this.dlUrl + name, options);
  }
}
