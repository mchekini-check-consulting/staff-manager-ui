import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ICra {
  id?: string;
  date: string;
  category: string;
  quantity: number;
  comment?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CraService {
  constructor(private http: HttpClient) {}

  createCra(cra: ICra): Observable<ICra> {
    return this.http.post<ICra>('/api/v1/activity', cra);
  }
}
