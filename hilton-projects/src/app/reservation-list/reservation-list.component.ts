import { Component, OnInit } from '@angular/core';
import {Reservation} from "../reservations";
import {DataSyncService} from "../data-sync.service";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private dataSyncService:DataSyncService) { }
  reservations: Reservation[] = [];
  ngOnInit(): void {
    this.dataSyncService.getReservationDataFromServer((data: Reservation[])=>{
      this.reservations = data;
    });
  }

}
