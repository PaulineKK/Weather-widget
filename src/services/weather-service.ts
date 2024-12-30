import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Forecast } from "../models/forecast-model";
import { LocationEnum } from "../models/locations.enum";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey = 'iysZLSo4x7gRqcmTYo1gALR2pwBcLYcu';
  private readonly url = `https://api.tomorrow.io/v4/weather/forecast`;
  constructor(private http: HttpClient) { }

  getWeather(location: LocationEnum): Observable<Forecast> {
    const paramsArray = [
      `location=${location}`,
      `apikey=${this.apiKey}`,
      `units=metric`
    ];

    const params = `?${paramsArray.join('&')}`;

    // return of(forecastMock) as unknown as Observable<Forecast>;
    return this.http.get<Forecast>(`${this.url}${params}`);
  }
}
