import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

import {FormsModule} from "@angular/forms";
import {WeatherForecastComponent} from "../components/weather-forecast/weather-forecast.component";
import {WeatherCurrentComponent} from "../components/weather-current/weather-current.component";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, WeatherForecastComponent, WeatherCurrentComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent {
  forecastMode = true;


}
