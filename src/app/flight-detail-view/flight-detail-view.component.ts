import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Flight} from "../flight";
import {DatePipe} from "@angular/common";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-flight-detail-view',
  templateUrl: './flight-detail-view.component.html',
  styleUrl: './flight-detail-view.component.css',
  providers: [provideNativeDateAdapter(), DatePipe]
})
export class FlightDetailViewComponent {
  @Input() selectedFlight!: Flight;
  @Input() flightClasses!: string[];
  @Output() editFlight: EventEmitter<Flight> = new EventEmitter<Flight>();
  @Output() addFlight: EventEmitter<Flight> = new EventEmitter<Flight>();
  invalidArrival = false;
  invalidDeparture = false;

  constructor(private datePipe: DatePipe) {}

  get isButtonDisabled(): boolean {
    const flight = this.selectedFlight;

    return this.isEmpty(flight.airline) ||
        this.isEmpty(flight.flightClass) ||
        this.isEmpty(flight.name) ||
        this.invalidDeparture ||
        this.invalidArrival ||
        flight.seatNumber > 200;
  }

  private isEmpty(str: string): boolean {
    return str === '' || str === undefined;
  }

  onDepartureDateChange(date: string): void {
    this.invalidDeparture = false;

    const departure = new Date(date);
    const arrival = new Date(this.selectedFlight.arrivalDate);
    const transformed = this.datePipe.transform(date, 'M/d/yy');
    this.selectedFlight.departureDate = transformed ?? '';

    if (departure > arrival) {
      this.invalidDeparture = true;
    }
  }

  onArrivalDateChange(date: string): void {
    this.invalidArrival = false

    const arrival = new Date(date);
    const departure = new Date(this.selectedFlight.departureDate);
    const transformed = this.datePipe.transform(date, 'M/d/yy');
    this.selectedFlight.arrivalDate = transformed ?? '';

    if (arrival < departure) {
      this.invalidArrival = true;
    }
  }

  get departureDateStringToDate(): Date {
    if (this.selectedFlight.departureDate) {
      return new Date(this.selectedFlight.departureDate);
    }

    return new Date();
  }

  get arrivalDateStringToDate(): Date {
    if (this.selectedFlight.arrivalDate) {
      return new Date(this.selectedFlight.arrivalDate);
    }

    return new Date();
  }
}
