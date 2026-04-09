// src/app/services/spacex.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from '../interfaces/launch.interface';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private readonly BASE_URL = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  /** Fetch all launches */
  getAllLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.BASE_URL);
  }

  /** Fetch launches filtered by year */
  getLaunchesByYear(year: string): Observable<Launch[]> {
    const params = new HttpParams().set('launch_year', year);
    return this.http.get<Launch[]>(this.BASE_URL, { params });
  }

  /** Fetch single launch by flight number */
  getLaunchByFlightNumber(flightNumber: number): Observable<Launch> {
    return this.http.get<Launch>(`${this.BASE_URL}/${flightNumber}`);
  }

  /** Fetch past launches only */
  getPastLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.BASE_URL}/past`);
  }

  /** Fetch upcoming launches */
  getUpcomingLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.BASE_URL}/upcoming`);
  }

  /** Get launches with combined filters */
  getFilteredLaunches(year?: string, success?: boolean): Observable<Launch[]> {
    let params = new HttpParams();
    if (year) params = params.set('launch_year', year);
    if (success !== undefined) params = params.set('launch_success', String(success));
    return this.http.get<Launch[]>(this.BASE_URL, { params });
  }
}
