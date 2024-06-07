import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCurrentComponent } from './weather-current.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('WeatherCurrentComponent', () => {
  let component: WeatherCurrentComponent;
  let fixture: ComponentFixture<WeatherCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCurrentComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
