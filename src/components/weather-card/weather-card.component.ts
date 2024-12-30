import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DailyWeather } from '../../models/forecast-model';

@Component({
  selector: 'app-weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {

  @Input() weather?: DailyWeather;
}
