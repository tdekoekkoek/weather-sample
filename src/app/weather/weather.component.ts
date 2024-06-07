import { Component } from '@angular/core';
import {WeatherService} from "../core/weather.service";
import {CommonModule} from "@angular/common";
import {WeatherRoot} from "../core/model/weather.model";
import {Day, VCRoot} from "../core/model/visual-crossing.model";
import {WeatherAdapter} from "../core/weather-adapter";
import {WeatherInfo} from "../core/model/weather-info";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {
  weatherDays: Array<Day> = [];
  weatherInfoArr: Array<WeatherInfo> = [];
  numDays = "2";

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
