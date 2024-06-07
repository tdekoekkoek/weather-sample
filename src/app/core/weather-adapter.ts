import {WeatherInfo} from "./model/weather-info";
import {Day} from "./model/visual-crossing.model";

export class WeatherAdapter {

  static getCloudClass(day: Day): string {
    switch(day.icon) {
      case 'rain': return 'weather-cloud-drizzle';
      case 'cloudy': return 'weather-cloud';
      case 'partly-cloudy-day': return 'weather-cloud';
      default: return 'weather-cloud-drizzle';
    }
  }

  static convertWeatherDaysToWidget(days: Array<Day>): Array<WeatherInfo> {
    return days.map(d => ({
      datetime: d.datetime,
      precip: d.precip,
      cloudClass: WeatherAdapter.getCloudClass(d),
      tempmin: d.tempmin,
      tempmax: d.tempmax
    }));
  }

}
