import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackServiceService } from 'src/app/Utilities/APIServices/feedback-service.service';
import { Feedback } from 'src/app/Utilities/Model/Feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedback: Feedback = new Feedback();
  feedbackForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _feedback_service: FeedbackServiceService,
    private _router: Router
  ) { 
    // Initialize form in the constructor
    this.feedbackForm = this._formBuilder.group({
      feedback: ["", [Validators.required]],
      rating: ["", [Validators.required]],
      additionalField:["",[Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check user authentication and role
    if (sessionStorage.getItem("login") == null || sessionStorage.getItem("role") !== "user") {
      this._router.navigate(["/page_not_found"]);
    }
  }

  submitFeedback(): void {
    if (this.feedbackForm.valid) {
      this.feedback.feedback = this.feedbackForm.value.feedback;
      this.feedback.rating = Number(this.feedbackForm.value.rating);
      this.feedback.userId = Number(sessionStorage.getItem("id"));
      this.feedback.description=this.feedbackForm.value.additionalField;

      this._feedback_service.addFeedback(this.feedback).subscribe({
        next: (response) => {
          // Optional: Show a success message or feedback
          console.log('Feedback submitted successfully:', response);
          this._router.navigate(["/user/user_account_show_events"]);
        },
        error: (error) => {
          // Handle error here
          console.error('Error submitting feedback:', error);
          alert('There was an error submitting your feedback. Please try again.');
        }
      });
    } else {
      // Show validation errors
      console.log('Form is invalid:', this.feedbackForm.errors);
    }
  }

}
