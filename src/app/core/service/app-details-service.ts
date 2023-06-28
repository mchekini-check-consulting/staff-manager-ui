import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppDetailsModel} from "../model/app.details.model";

@Injectable({
  providedIn: 'root'
})
export class AppDetailsService {

  constructor(private http: HttpClient) {
  }


  getAppDetails(): Observable<AppDetailsModel> {

    return this.http.get<AppDetailsModel>("/api/v1/app/details");
  }


}
