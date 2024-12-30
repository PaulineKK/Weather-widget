export interface Forecast {
  location: {
    latitude: number;
    longitude: number;
  };
  timelines: {
    daily: DailyWeather[];
    hourly: HourlyWeather[];
  }
}

export interface DailyWeather {
  time: string;
  values: {
    temperatureMax: number;
    temperatureMin: number;
    rainAccumulationSum: number;
    precipitationProbabilityAvg: number;
    windGustAvg: number;
  }
}

export interface HourlyWeather {
  time: string;
  values: {
    rainAccumulation: number;
    temperature: number;
    uvIndex: number;
  }
}

