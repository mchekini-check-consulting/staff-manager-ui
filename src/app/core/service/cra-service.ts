import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CraModel } from '../model/cra-model';

interface ICra {
  id?: string;
  startingDate: string;
  endingDate: string;
  extendHours?: number;
  astreinte: boolean;
  objects: {
    category: string;
    hours: number;
    comment?: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class CraService {
  constructor(private http: HttpClient) {}

  createCra(cra: CraModel): Observable<CraModel> {
    return this.http.post<CraModel>('/api/v1/collaborator/cra', cra);
  }
}
