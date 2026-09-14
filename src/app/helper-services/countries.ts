import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export interface countriesInfo {
  name: string;
  demonym: string;
} 

@Injectable({
  providedIn: 'root',
})
export class Countries {
  private countries = signal<countriesInfo[]>([])
  succes:boolean = false;
  allCountries = this.countries.asReadonly()
  private url:string = "/api/countries?fields=name,demonym"
  private http = inject(HttpClient);

  getCountriesAndNationalities() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer rc_live_demo'
    });

    return this.http.get<countriesInfo[]>(this.url, { headers }).subscribe(
      {
        next: (value)=>{
          console.log(value)
          
          this.countries.set(value);
          this.succes = true
        },
        error: (e) => {
          console.log("Fetching Countries Error: ", e)
        }
      }
    )
  }
}
