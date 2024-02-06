import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Flight} from "../flight";
import {MatChipListboxChange} from "@angular/material/chips";

@Component({
  selector: 'app-flight-list-view',
  templateUrl: './flight-list-view.component.html',
  styleUrl: './flight-list-view.component.css'
})
export class FlightListViewComponent {
  @Input() flights!: Flight[];
  @Input() flightClasses!: string[];
  @Output() deleteFlight: EventEmitter<Flight> = new EventEmitter<Flight>();
  @Output() selectFlight: EventEmitter<Flight> = new EventEmitter<Flight>();
  @Output() removeAllFlights: EventEmitter<void> = new EventEmitter<void>();
  filteredFlights: Flight[] = [];

  get visibleFlightList(): Flight[] {
    if (!this.flights.length) {
      return [];
    }

    const difference = this.flights.filter(c => this.filteredFlights.includes(c));

    /*
      Check to see if the flight list is different then the current filtered list.
      If that is the case then we have deleted a flight while we were filtered. Update the list accordingly.
     */
    if (difference.length !== this.filteredFlights.length) {
      this.filteredFlights = difference;
    }

    return this.filteredFlights.length ? this.filteredFlights : this.flights;
  }

  doFilter(changes: MatChipListboxChange): void {
    // If there is a value, a chip has been selected, so we need to filter. Otherwise, it is not selected, so we remove the filter.
    if (changes.value) {
      this.filteredFlights = this.flights.filter(c => c.flightClass === changes.value);
    } else {
      this.filteredFlights = [];
    }
  }
}
