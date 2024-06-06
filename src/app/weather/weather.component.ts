import { Component } from '@angular/core';
import {WeatherService} from "../core/weather.service";
import {CommonModule} from "@angular/common";
import {WeatherRoot} from "../core/model/weather.model";
import {VCRoot} from "../core/model/visual-crossing.model";
import {WeatherAdapter} from "../core/weather-adapter";
import {WeatherInfo} from "../core/model/weather-info";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {
  weather!: VCRoot;
  weatherInfoArr: Array<WeatherInfo> = [];
  weatherStruct: {
    cloudClass: string;
  }= {
    cloudClass: ''
  }

  constructor(private weatherService: WeatherService) {
    this.weatherService.fetchWeather3().subscribe(result => {
      this.weather = result;
      this.weatherInfoArr = this.weatherService.convertWeatherDaysToWidget(this.weather.days);
    });
  }


}
