import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartSubjectEnum } from '../../models/chart-subject.enum';
import { HourlyWeather } from '../../models/forecast-model';

@Component({
  selector: 'app-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  providers: [DatePipe],
  standalone: true
})
export class ChartComponent {
  @Input() weather: HourlyWeather[] = [];

  isBrowser: boolean = false;
  chartSubjects = ChartSubjectEnum;
  selectedChartSubject = ChartSubjectEnum.Temperature;

  chartData: Array<{ data: number[], label: string }> = [];

  chartOptions: ChartOptions = {
    responsive: true,
  }

  chartLabels: string[] = []

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const temperature = this.weather.slice(0, 11).map((item) => item.values.temperature);
    this.chartData = [{ data: temperature, label: 'Temperatuur' }];
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.chartLabels = this.weather.slice(0, 11).map((item) =>
      this.datePipe.transform(item.time, 'shortTime'))
      .filter((label): label is string => label !== null);
  }

  onChangeChart(chartSubject: ChartSubjectEnum) {
    switch (chartSubject) {
      case ChartSubjectEnum.Temperature:
        this.selectedChartSubject = ChartSubjectEnum.Temperature;
        const temperatureValues = this.weather.slice(0, 11).map((item) => item.values.temperature);
        this.setChartOptions(false);
        this.chartData = [{ data: temperatureValues, label: 'Temperatuur' }];
        break;
      case ChartSubjectEnum.Rain:
        this.selectedChartSubject = ChartSubjectEnum.Rain
        const rainValues = this.weather.slice(0, 11).map((item) => item.values.rainAccumulation);
        this.setChartOptions(true);
        this.chartData = [{ data: rainValues, label: 'Regen' }];
        break;
      case ChartSubjectEnum.UvIndex:
        this.selectedChartSubject = ChartSubjectEnum.UvIndex;
        const uvIndexValues = this.weather.slice(0, 11).map((item) => item.values.uvIndex);
        this.setChartOptions(true);
        this.chartData = [{ data: uvIndexValues, label: 'UV-index' }];
        break;
    }
  }

  setChartOptions(beginAtZero: boolean) {
    this.chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: beginAtZero
        }
      }
    }
  }
}
