import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {RootObject, WeatherRoot} from "./model/weather.model";
import {HttpClient} from "@angular/common/http";
import {fromFetch} from "rxjs/internal/observable/dom/fetch";
import {Day, VCRoot} from "./model/visual-crossing.model";
import {WeatherInfo} from "./model/weather-info";
import {WeatherAdapter} from "./weather-adapter";

const TOMORROW_API = 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466';
const API_KEY = 'dViBJCwSjXzGZutXQxSbb4TsIC0S3Te6';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  // createUrl = ({ url, query = {} }) => {
  //   const urlBuilder = new URL(url);
  //
  //   Object.entries(query).forEach(([key, value]) => {
  //     if (value == null) {
  //       return;
  //     }
  //
  //     if (Array.isArray(value)) {
  //       value.forEach((val) => urlBuilder.searchParams.append(key, val));
  //       return;
  //     }
  //
  //     urlBuilder.searchParams.append(key, value);
  //   });
  //
  //   return urlBuilder.toString();
  // };

  fetchWeather(): Observable<WeatherRoot> {
    const url = `${TOMORROW_API}&apikey=${API_KEY}`;

    // const url = this.createUrl({
    //   url: 'https://api.tomorrow.io/v4/timelines',
    //   query: {
    //     API_KEY,
    //     // location: `${lat},${lon}`,
    //     units: 'metric',
    //     // startTime,
    //     // endTime,
    //     timesteps: 'current,1h',
    //     fields: 'precipitationIntensity,temperature,temperatureApparent,weatherCode',
    //   }
    // });
    return this.http.get<WeatherRoot>(url);
  }

  fetchWeather2(): Observable<any> {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        location: '42.3478, -71.0466',
        fields: ['temperature'],
        units: 'metric',
        timesteps: ['2h'],
        startTime: 'now',
        endTime: 'nowPlus6h'
      })
    };

    fetch('https://api.tomorrow.io/v4/timelines?apikey=dViBJCwSjXzGZutXQxSbb4TsIC0S3Te6', options)
       .then(response => response.json())
       .then(response => console.log(response))
    return of({})
    // return fromFetch('https://api.tomorrow.io/v4/timelines?apikey=dViBJCwSjXzGZutXQxSbb4TsIC0S3Te6', options)
  }

  fetchWeather3(): Observable<VCRoot> {
    // const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Utrecht?unitGroup=metric&key=2P39G8YSJ2V9WTFNQSKNEHD9Q&contentType=json';
    const startDate = '2024-06-06';
    const endDate = '2024-06-13';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Utrecht/${startDate}/${endDate}?unitGroup=metric&key=2P39G8YSJ2V9WTFNQSKNEHD9Q&contentType=json`;
    return this.http.get<VCRoot>(url);
  }

  convertWeatherDaysToWidget(days: Array<Day>): Array<WeatherInfo> {
    return days.map(d => ({
      date: d.datetime,
      precip: d.precip,
      cloudClass: WeatherAdapter.getCloudClass()
    }));
  }

}
