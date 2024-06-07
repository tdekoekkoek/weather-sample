import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastComponent } from './weather-forecast.component';
import {WeatherComponent} from "../../weather/weather.component";
import {WeatherService} from "../../core/weather.service";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Day} from "../../core/model/visual-crossing.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;

  @Injectable()
  class WeatherServiceMock {
    fetchWeatherTS(startDate: Date, numDays: number): Observable<Array<Day>> {
      return of([
        {
          datetime: '06-07-2024'
        },
        {
          datetime: '06-08-2024'
        },
        {
          datetime: '06-09-2024'
        },
      ] as Array<Day>);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastComponent, HttpClientTestingModule],
      providers: [{ provide: WeatherService, useClass: WeatherServiceMock }],

    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display 3 rows of weather data`, () => {
    const fixture = TestBed.createComponent(WeatherComponent);
    const app = fixture.componentInstance;
    component.fetchWeather();
    fixture.detectChanges();
    const elements = document.getElementsByClassName('weather-element')
    expect(elements.length).toEqual(3);
  });

});
