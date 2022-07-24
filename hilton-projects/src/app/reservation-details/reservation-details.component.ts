import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Reservation} from "../reservations";
import {DataSyncService} from "../data-sync.service";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {

  reservations: Reservation[] = [];
  reservation: Reservation | undefined;

  constructor(private route: ActivatedRoute, private dataSyncService: DataSyncService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const reserveIdFromRoute = String(routeParams.get('reservationID'));
    
    this.dataSyncService.getReservationDataFromServer((data: Reservation[])=>{
      this.reservations = data;
      this.reservation = this.reservations.find(reservation => reservation.id === reserveIdFromRoute);
    });
    // Find the product that correspond with the id provided in route.
  }


}
