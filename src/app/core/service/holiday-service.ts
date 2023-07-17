import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { Observable } from 'rxjs';

export interface IPublicHolidays {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number;
  types: string[];
}

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  constructor(private http: HttpClient) {}

  getPublicHolidays(): Observable<IPublicHolidays[]> {
    return this.http.get<IPublicHolidays[]>(
      `https://date.nager.at/api/v3/PublicHolidays/${new Date().getFullYear()}/FR`
    );
  }

  getWeekEnds() {
    const year = new Date().getFullYear();
    const weekends: Date[] = [];
    const date = new Date(year, 0, 1); // January 1st of the year

    while (date.getFullYear() === year) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        weekends.push(new Date(date));
      }
      date.setDate(date.getDate() + 1); // Move to the next day
    }

    return weekends.map((d: any) => {
      return {
        title: '',
        date: format(new Date(d), 'yyyy-MM-dd'),
        display: 'background',
        color: 'gray',
      };
    });
  }
}
