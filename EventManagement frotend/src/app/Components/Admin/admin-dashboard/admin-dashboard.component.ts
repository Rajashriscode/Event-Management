import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService } from 'src/app/Utilities/APIServices/booking-service.service';
import { FeedbackServiceService } from 'src/app/Utilities/APIServices/feedback-service.service';
import { UserServiceService } from 'src/app/Utilities/APIServices/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  bookingList: any = [];
  feedbackList: any = [];
  organizerList: any = [];
  userList: any = [];

  constructor(private _router:Router,
    private bookingService: BookingServiceService,
    private _feedback_service:FeedbackServiceService,
    private _organizer_service:UserServiceService,
    private _user_service:UserServiceService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("login") == null || sessionStorage.getItem("role")!="admin") this._router.navigate(["/page_not_found"]);

    this.bookingService.getAllBookings().subscribe(response => this.bookingList=response);
    this._feedback_service.getAllFeedback().subscribe(response => this.feedbackList=response);
    this._organizer_service.getAllUserByRole("organizer").subscribe((organizer) => this.organizerList=organizer);
    this._user_service.getAllUserByRole("user").subscribe(user => this.userList=user);
  }

  
}
