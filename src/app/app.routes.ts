import { Routes } from '@angular/router';
import {WeatherComponent} from "./weather/weather.component";
import {WeatherGridComponent} from "./weather-grid/weather-grid.component";

export const routes: Routes = [
  { path: '',
    redirectTo: 'weather', pathMatch: 'full'
  },
  {
    path: 'weather-table',
    component: WeatherGridComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  }
];
