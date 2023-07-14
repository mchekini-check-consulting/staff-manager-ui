import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CraModel } from '../model/cra-model';

@Injectable({
  providedIn: 'root',
})
export class CraService {
  constructor(private http: HttpClient) {}

  createCra(cra: CraModel): Observable<CraModel> {
    // const headers = {
    //   Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
    // };
    const rqt = this.http.post<CraModel>('/api/v1/activity', cra);
    console.log(rqt);
    return rqt;
  }
}
