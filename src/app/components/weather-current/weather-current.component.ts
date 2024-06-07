import { Component } from '@angular/core';
import {WeatherService} from "../../core/weather.service";
import {WeatherAdapter} from "../../core/weather-adapter";
import {Day, Hour} from "../../core/model/visual-crossing.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-weather-current',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-current.component.html',
  styleUrl: './weather-current.component.scss'
})
export class WeatherCurrentComponent {
  weatherDay!: Day;
  location = 'Utrecht';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather() {
    this.weatherService.fetchWeatherHourlyTS(new Date(), 0).subscribe(result => {
      this.weatherDay = result;
    });
  }

}
