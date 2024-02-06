import { Injectable } from '@angular/core';
import {Flight} from "./flight";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {v4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flights: Flight[] = [];
  selectedFlight: Flight = {} as Flight;
  private url = 'https://mock-json-server-five.vercel.app/flights';

  constructor(private http: HttpClient) {}

  getFlights() {
    this.http.get<Flight[]>(this.url)
        .pipe(
            // return an empty array here if there was an error on the request
            catchError(this.handleError<Flight[]>([]))
        ).subscribe(resp => this.flights = resp);
  }

  deleteFlight(checkIn: Flight): void {
    this.flights = this.flights.filter(c => c.id !== checkIn.id);
  }

  removeAllFlights(): void {
    this.flights = [];
    this.selectedFlight = {} as Flight;
  }

  editFlight(checkIn: Flight): void {
    const index = this.flights.findIndex(c => c.id === checkIn.id);

    // -1 is not found
    if (index !== -1) {
      this.flights[index] = checkIn;
    }

    this.selectedFlight = {} as Flight;
  }

  selectFlight(checkIn: Flight): void {
    // Select
    if (!this.selectedFlight || this.selectedFlight.id !== checkIn.id) {
      this.selectedFlight = {...checkIn};
    } else {
      // Unselect
      this.selectedFlight = {} as Flight;
    }
  }

  addFlight(checkIn: Flight): void {
    const toAdd: Flight = {...checkIn};
    toAdd.id = v4();

    this.flights.push(toAdd);
    this.selectedFlight = {} as Flight;
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
