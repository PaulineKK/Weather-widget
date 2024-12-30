import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { ChartComponent } from '../../components/chart/chart.component';
import { WeatherCardComponent } from "../../components/weather-card/weather-card.component";
import { DailyWeather, Forecast, HourlyWeather } from '../../models/forecast-model';
import { LocationEnum } from '../../models/locations.enum';
import { RequestState } from '../../models/Request-state.model';
import { WeatherService } from '../../services/weather-service';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, FormsModule, WeatherCardComponent, ChartComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  standalone: true
})
export class HomepageComponent {
  title = 'weather_widget';

  constructor(
    private readonly weatherService: WeatherService
  ) { }

  foreCast$?: Observable<RequestState<Forecast>>;
  foreCastToday?: Forecast;
  foreCastRestOfTheWeek?: Forecast;
  locations = Object.values(LocationEnum);
  selectedLocation = 'Leeuwarden';

  ngOnInit() {
    this.getWeather(LocationEnum.Leeuwarden);
  }

  onLocationChange(event: Event) {
    event.preventDefault();

    const target = event.target as HTMLSelectElement;
    const locationKey = target.value;
    this.selectedLocation = locationKey;
    this.getWeather(locationKey as LocationEnum);
  }

  private getWeather(location: LocationEnum) {
    this.foreCast$ = this.weatherService.getWeather(location)
      .pipe(
        map((foreCast) => {
          const today = new Date().toISOString().split('T')[0];
          const todayDaily: DailyWeather[] = [];
          const restOfTheWeekDaily: DailyWeather[] = [];
          const todayHourly: HourlyWeather[] = [];
          const restOfTheWeekHourly: HourlyWeather[] = [];

          foreCast.timelines.daily.forEach(daily => {
            if (this.isToday(today, daily.time)) {
              todayDaily.push(daily);
            } else {
              restOfTheWeekDaily.push(daily);
            }
          });

          foreCast.timelines.hourly.forEach(hourly => {
            if (this.isToday(today, hourly.time)) {
              todayHourly.push(hourly);
            } else {
              restOfTheWeekHourly.push(hourly);
            }
          });

          this.foreCastToday = {
            location: foreCast.location,
            timelines: {
              daily: todayDaily,
              hourly: todayHourly
            }
          };

          this.foreCastRestOfTheWeek = {
            location: foreCast.location,
            timelines: {
              daily: restOfTheWeekDaily,
              hourly: restOfTheWeekHourly
            }
          };

          return ({ isLoading: false, value: foreCast })
        }),
        catchError(error => of({ isLoading: false, error })),
        startWith({ isLoading: true })
      );
  }

  private isToday(today: string, dateToCheck: string) {
    return new Date(dateToCheck).toISOString().split('T')[0] === today;
  }
}
