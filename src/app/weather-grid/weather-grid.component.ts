import { Component } from '@angular/core';
import {WeatherService} from "../core/weather.service";
import {CommonModule} from "@angular/common";
import {Day} from "../core/model/visual-crossing.model";

@Component({
  selector: 'app-weather-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-grid.component.html',
  styleUrl: './weather-grid.component.scss'
})
export class WeatherGridComponent {
  weatherDays: Array<Day> = [];

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.weatherService.fetchWeatherTS(new Date(), 4).subscribe(result => {
      this.weatherDays = result;
    });
  }
}
