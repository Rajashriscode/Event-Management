import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventCategoryServiceService } from 'src/app/Utilities/APIServices/event-category-service.service';
import { EventServiceService } from 'src/app/Utilities/APIServices/event-service.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  id: any;
  event: any;
  editEventForm: FormGroup = this._fb.group({
    eventName: [''],
    eventCategory: [''],
    eventVenue: [''],
    eventDate: [''],
    eventTime: [''],
    eventPrice: [''],
    eventDescription: [''],
  });
  categoryList: any = [];
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _eventService: EventServiceService,
    private _event_category_service:EventCategoryServiceService
  ) {
  }

  ngOnInit(): void {
    if (
      sessionStorage.getItem('login') == null ||
      sessionStorage.getItem('role') != 'organizer'
    )
      this._router.navigate(['/page_not_found']);

      this._event_category_service.getAllCategories().subscribe(resp => {this.categoryList=resp;});
    this._activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.getEvent(this.id);
  }

  editEvent() {
    const body: any = {
      eventId: this.id,
      name: this.editEventForm.controls['eventName'].value,
      category: this.editEventForm.controls['eventCategory'].value,
      venue: this.editEventForm.controls['eventVenue'].value,
      date: this.editEventForm.controls['eventDate'].value,
      time: this.editEventForm.controls['eventTime'].value,
      price: this.editEventForm.controls['eventPrice'].value,
      description: this.editEventForm.controls['eventDescription'].value,
    };

    this._eventService
      .updateEvent(this.id, body)
      .subscribe((response: any) => {
        alert("Event Updated Successfully");
      });
    setTimeout(() => {
      this._router.navigate(['/organizer/organizer_account_show_events']);
    }, 1000);
  }

  getEvent(id: any): void {
    this._eventService.getEvent(id).subscribe((response: any) => {
      this.event = response;
    });
  }
}
