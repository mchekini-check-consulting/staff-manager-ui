import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  JustificatifModelIn,
  JustificatifModelOut,
} from '../model/justificatif-model';

const BASE_URL = '/api/v1';

@Injectable({
  providedIn: 'root',
})
export class JustificatifService {
  constructor(private http: HttpClient) {}

  createJustificatif(
    justificatif: JustificatifModelIn
  ): Observable<JustificatifModelOut> {
    const formData = new FormData();

    formData.append('type', justificatif.type);
    formData.append('file', justificatif.file);

    return this.http.post<JustificatifModelOut>(
      BASE_URL + '/justificatif',
      formData
    );
  }
}
