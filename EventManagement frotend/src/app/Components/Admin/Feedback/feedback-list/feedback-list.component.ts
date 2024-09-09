import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackServiceService } from 'src/app/Utilities/APIServices/feedback-service.service';
import { Feedback } from 'src/app/Utilities/Model/Feedback';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  feedbackListt: Feedback[] = []; // Array to hold feedback data

  constructor(
    private _feedback_service: FeedbackServiceService,
    private _router: Router
  ) {
    // Redirect to "page_not_found" if not logged in or not an admin
    if (sessionStorage.getItem("login") === null || sessionStorage.getItem("role") !== "admin") {
      this._router.navigate(["/page_not_found"]);
    }
  }

  ngOnInit(): void {
    // Fetch feedback data when the component initializes
    this._feedback_service.getAllFeedback().subscribe(
      response => {
        this.feedbackListt = response; // Assign the fetched data to feedbackListt
        console.log(this.feedbackListt); // Log the data to the console for debugging
      },
      error => {
        console.error('Error fetching feedback data', error); // Log errors to the console
      }
    );
  }
}
