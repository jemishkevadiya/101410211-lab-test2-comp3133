import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {
  private apiUrl = 'https://api.spacexdata.com/v4/launches';

  constructor(private http: HttpClient) { }

  getAllLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.apiUrl}`);
  }

  getLaunchById(id: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.apiUrl}/${id}`);
  }

  getLaunchesByYear(year: string): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.apiUrl}?query={"date_utc":{"$gte":"${year}-01-01","$lte":"${year}-12-31"}}`);
  }
}