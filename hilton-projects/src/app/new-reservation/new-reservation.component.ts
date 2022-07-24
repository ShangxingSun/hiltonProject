import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { DataSyncService} from "../data-sync.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {

  newReservationForm = this.formBuilder.group({
    guest_name : '',
    arrival_time: '',
    table_size: 0,
    guest_contact : '',
    status : 'open'
  });

  url : string | undefined;
  editable : boolean | undefined;
  reservationID: string | undefined;
  constructor( private formBuilder: FormBuilder , private dataSyncService: DataSyncService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.url = this.route.snapshot.url[0].path;
    this.editable = (this.url !== "new-reservation");
    console.log(this.editable);
    if(this.editable){
      const reserveIdFromRoute = String(routeParams.get('reservationID'));
      this.reservationID = reserveIdFromRoute;
      let reservations = this.dataSyncService.getReservationData();
      let reservation = reservations.find(item=>{ return item.id === reserveIdFromRoute});
      if(reservation){
        this.newReservationForm.get('guest_name')?.setValue(reservation.guest_name);
        this.newReservationForm.get('arrival_time')?.setValue(reservation.arrival_time);
        this.newReservationForm.get('table_size')?.setValue(reservation.table_size);
        this.newReservationForm.get('guest_contact')?.setValue(reservation.guest_contact);
        this.newReservationForm.get('status')?.setValue(reservation.status);
      }      
    }
    //c
  }

  onSubmit(){
    if(this.editable){
      if(this.newReservationForm && this.reservationID){
        this.dataSyncService.updateReservationDataFromServer(this.newReservationForm.value, this.reservationID);
        this.newReservationForm.reset();
      }
    }else{
      if(this.newReservationForm){
        this.dataSyncService.postReservationDataFromServer(this.newReservationForm.value);
        this.newReservationForm.reset();
      }
    }


  }

}
