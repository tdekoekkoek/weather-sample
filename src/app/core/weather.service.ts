import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Day, Hour, VCRoot} from "./model/visual-crossing.model";
const TOMORROW_API = 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466';
const API_KEY = 'dViBJCwSjXzGZutXQxSbb4TsIC0S3Te6';
const VC_WEATHER_SERVICE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const VC_API_KEY = '2P39G8YSJ2V9WTFNQSKNEHD9Q';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  fetchWeatherHourlyTS(startDate: Date, numDays: number): Observable<Day> {
    const stopDate = new Date();
    stopDate.setDate(startDate.getDate() + numDays);
    const location = 'Utrecht';
    const sStartDate = this.formatDate(startDate);
    const sStopDate = this.formatDate(stopDate);
    const url = `${VC_WEATHER_SERVICE}/${location}/${sStartDate}/${sStopDate}?unitGroup=metric&key=${VC_API_KEY}&contentType=json`;
    return this.http.get<VCRoot>(url)
      .pipe(map(root => root.days[0]));
  }

  fetchWeatherTS(startDate: Date, numDays: number): Observable<Array<Day>> {
    const stopDate = new Date();
    stopDate.setDate(startDate.getDate() + numDays);
    const location = 'Utrecht';
    const sStartDate = this.formatDate(startDate);
    const sStopDate = this.formatDate(stopDate);
    const url = `${VC_WEATHER_SERVICE}/${location}/${sStartDate}/${sStopDate}?unitGroup=metric&key=${VC_API_KEY}&contentType=json`;
    return this.http.get<VCRoot>(url)
      .pipe(map(root => root.days));
  }

  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Add 1 as months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

}
