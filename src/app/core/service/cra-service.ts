import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CraModel } from '../model/cra-model';

const BASE_URL = '/api/v1';

@Injectable({
  providedIn: 'root',
})
export class CraService {
  constructor(private http: HttpClient) {}

  createCra(cra: CraModel): Observable<CraModel> {
    return this.http.post<CraModel>(BASE_URL + '/activity', cra);
  }
}
