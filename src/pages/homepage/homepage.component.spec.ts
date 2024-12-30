import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { forecastMock } from '../../mocks/forecast-mock';
import { HourlyWeather } from '../../models/forecast-model';
import { WeatherService } from '../../services/weather-service';
import { HomepageComponent } from './homepage.component';

@Component({
  selector: 'app-chart',
  template: '',
  standalone: false
})
class MockChartComponent {
  @Input() weather: HourlyWeather[] = [];
}

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let weatherServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    weatherServiceSpy = jasmine.createSpy('getWeather').and.returnValue(of(forecastMock));
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        HomepageComponent
      ],
      declarations: [MockChartComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getWeather: weatherServiceSpy
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
