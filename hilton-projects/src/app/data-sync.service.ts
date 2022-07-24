import { Injectable } from '@angular/core';
import { Reservation} from './reservations';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataSyncService {
  reservationData : Reservation[] = [];
  constructor(private http: HttpClient) { }

  getReservationData(){
    return this.reservationData;
  }
  getReservationDataFromServer(callback: any){
    console.log("running");
    let url = "http://127.0.0.1:3000/reservations";
    this.http.get<Reservation[]>(url).subscribe((data: Reservation[])=>{
      this.reservationData = data;
      if(callback){
        callback(data);
      }
    })
    
  }
  updateReservationDataFromServer(data: any, reservationID: string){
    let url = "http://127.0.0.1:3000/reservation/"+reservationID;
    let newReservation : Reservation = {
      id: reservationID,
      guest_name: data.guest_name,
      arrival_time: data.arrival_time,
      guest_contact: data.guest_contact,
      table_size: data.table_size,
      status: data.status
    }
    return this.http.put<Reservation>(url,newReservation).subscribe(()=>{
      this.getReservationDataFromServer(null);
    });
  }
  postReservationDataFromServer(data: any){
    let url = "http://127.0.0.1:3000/reservation";
    let newReservation : Reservation = {
      id: '',
      guest_name: data.guest_name,
      arrival_time: data.arrival_time,
      guest_contact: data.guest_contact,
      table_size: data.table_size,
      status: data.status
    }
    return this.http.post<Reservation>(url,newReservation).subscribe(()=>{
      this.getReservationDataFromServer(null);
    });
  }
  

}
