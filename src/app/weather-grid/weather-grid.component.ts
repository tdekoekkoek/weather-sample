import { Component } from '@angular/core';
import {WeatherService} from "../core/weather.service";
import {RootObject, WeatherRoot} from "../core/model/weather.model";
import {CommonModule} from "@angular/common";
import {VCRoot} from "../core/model/visual-crossing.model";

@Component({
  selector: 'app-weather-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-grid.component.html',
  styleUrl: './weather-grid.component.scss'
})
export class WeatherGridComponent {
  weather!: VCRoot;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.weatherService.fetchWeather3().subscribe(result => {
      this.weather = result;
    });
  }
}
