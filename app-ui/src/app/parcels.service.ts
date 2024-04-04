import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {delay, map} from "rxjs";
import {Parcel} from "./app.component";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ParcelsService {
  host = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getParcels() {
    return this.http.get(`${this.host}/parcels`).pipe(map((res) => res));
  }

  checkForDuplicateSku(sku: string) {
    const options = {params: new HttpParams().set('sku', sku)};
    return this.http.get(`${this.host}/parcels/${sku}`, options).pipe(delay(400));
  }

  addParcel(parcel: Parcel) {
    let data = JSON.stringify(parcel);

    return this.http.post<any>(`${this.host}/parcels`, data, httpOptions);
  }

  filterParcels(country: any, description: any) {
    country = country? country.trim() : undefined;
    description = description? description.trim() : undefined;

    let options = {params: new HttpParams()};

    if (description === undefined) {
     options.params.set('country', country);
     return this.http.get<Parcel[]>(`${this.host}/parcels/country/${country}`, options)
       .pipe(map((res) => res));
    } else if (country === undefined) {
      options.params.set('description', description);
      return this.http.get<Parcel[]>(`${this.host}/parcels/description/${description}`, options)
        .pipe(map((res) => res));
    } else {
       options.params.set('country', country).set('description', description);
       return this.http.get<Parcel[]>(`${this.host}/parcels/filter/${country}/${description}`, options)
         .pipe(map((res) => res));
    }
  }
}
