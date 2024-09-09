import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from 'src/app/Utilities/APIServices/booking-service.service';
import { Booking } from 'src/app/Utilities/Model/Booking';
import { User } from 'src/app/Utilities/Model/User';

@Component({
  selector: 'app-all-booking',
  templateUrl: './all-booking.component.html',
  styleUrls: ['./all-booking.component.scss']
})
export class AllBookingComponent implements OnInit {
edit(arg0: any) {
throw new Error('Method not implemented.');
}
delete(arg0: any) {
throw new Error('Method not implemented.');
}

  bookingList:Booking[]=[]
organizerToBeSearched: any;
organizerList: User[] | undefined;

  constructor(private _booking_service: BookingServiceService, private _router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("login") == null || sessionStorage.getItem("role")!="admin") this._router.navigate(["/page_not_found"]);
    this.getAllBookings();
    
    
  }
  

  getAllBookings(): void {
    this._booking_service.getAllBookings().subscribe(response => this.bookingList=response);

  }

  setStatusPending(id:number){
    this._booking_service.setBookingStatus(id,"pending").subscribe(response => this.getAllBookings());
 
  }

  setStatusApproved(id:number){
    this._booking_service.setBookingStatus(id,"approved").subscribe(response => this.getAllBookings());
  }

}
