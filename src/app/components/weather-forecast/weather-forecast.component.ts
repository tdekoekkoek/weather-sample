import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {WeatherAdapter} from "../../core/weather-adapter";
import {Day} from "../../core/model/visual-crossing.model";
import {WeatherInfo} from "../../core/model/weather-info";
import {WeatherService} from "../../core/weather.service";

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})
export class WeatherForecastComponent {
  weatherDays: Array<Day> = [];
  weatherInfoArr: Array<WeatherInfo> = [];
  numDays = "2";
  forecastMode = true;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather() {
    this.weatherService.fetchWeatherTS(new Date(), +this.numDays).subscribe(result => {
      this.weatherDays = result;
      this.weatherInfoArr = WeatherAdapter.convertWeatherDaysToWidget(this.weatherDays);
    });
  }

}
