import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor( private httpClient: HttpClient) { }

  getCountries() {
    return this.httpClient.get('https://restcountries.eu/rest/v2/all')
    .pipe(
      map(
        (countries: any[]) =>
          countries.map( countrie => ({ name: countrie.name, code: countrie.alpha2Code})
        )
      )
    );
  }
}
