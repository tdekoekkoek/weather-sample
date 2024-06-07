import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import {WeatherRoot} from "./model/weather.model";
import {HttpClient} from "@angular/common/http";
import {Day, VCRoot} from "./model/visual-crossing.model";
import {WeatherInfo} from "./model/weather-info";
import {WeatherAdapter} from "./weather-adapter";

const VC_WEATHER_SERVICE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const TOMORROW_API = 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466';
const API_KEY = 'dViBJCwSjXzGZutXQxSbb4TsIC0S3Te6';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  // fetchWeather(): Observable<WeatherRoot> {
  //   const url = `${TOMORROW_API}&apikey=${API_KEY}`;
  //
  //   // const url = this.createUrl({
  //   //   url: 'https://api.tomorrow.io/v4/timelines',
  //   //   query: {
  //   //     API_KEY,
  //   //     // location: `${lat},${lon}`,
  //   //     units: 'metric',
  //   //     // startTime,
  //   //     // endTime,
  //   //     timesteps: 'current,1h',
  //   //     fields: 'precipitationIntensity,temperature,temperatureApparent,weatherCode',
  //   //   }
  //   // });
  //   return this.http.get<WeatherRoot>(url);
  // }
  //
  // fetchWeather2(): Observable<any> {
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       accept: 'application/json',
  //       'Accept-Encoding': 'gzip',
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       location: '42.3478, -71.0466',
  //       fields: ['temperature'],
  //       units: 'metric',
  //       timesteps: ['2h'],
  //       startTime: 'now',
  //       endTime: 'nowPlus6h'
  //     })
  //   };
  //
  //   fetch('https://api.tomorrow.io/v4/timelines?apikey=dViBJCwSjXzGZutXQxSbb4TsIC0S3Te6', options)
  //      .then(response => response.json())
  //      .then(response => console.log(response))
  //   return of({})
  //   // return fromFetch('https://api.tomorrow.io/v4/timelines?apikey=dViBJCwSjXzGZutXQxSbb4TsIC0S3Te6', options)
  // }

  fetchWeatherTS(startDate: Date, numDays: number): Observable<Array<Day>> {
    const stopDate = new Date();
    stopDate.setDate(startDate.getDate() + numDays);
    const location = 'Utrecht';
    const sStartDate = this.formatDate(startDate);
    const sStopDate = this.formatDate(stopDate);
    const url = `${VC_WEATHER_SERVICE}/${location}/${sStartDate}/${sStopDate}?unitGroup=metric&key=2P39G8YSJ2V9WTFNQSKNEHD9Q&contentType=json`;
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
