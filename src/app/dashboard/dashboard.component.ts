import {Component, OnInit} from '@angular/core';
import {FlightService} from "../flight.service";
import {FlightClass} from "../flight-class";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  flightClasses: string[] = Object.values(FlightClass);

  constructor(
      public flightService: FlightService,
      public userService: UserService,
      private router: Router,
      private authService:AuthenticationService) {}


  ngOnInit() {
    this.flightService.getFlights();
  }

  logout(): void {
    this.authService.setIsAuthenticated(false);
    sessionStorage.setItem('username', '');
    this.router.navigate(['/login']);
  }
}
