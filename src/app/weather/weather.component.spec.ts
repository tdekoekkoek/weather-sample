import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppComponent} from "../app.component";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Day, VCRoot} from "../core/model/visual-crossing.model";
import {WeatherService} from "../core/weather.service";

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

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
  let service: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherComponent, HttpClientTestingModule],
      providers: [{ provide: WeatherService, useClass: WeatherServiceMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(WeatherComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Ordina Weather Widget');
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
