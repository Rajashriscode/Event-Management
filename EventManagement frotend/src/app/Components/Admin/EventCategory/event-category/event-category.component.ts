import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventCategoryServiceService } from 'src/app/Utilities/APIServices/event-category-service.service';
import { EventCategory } from 'src/app/Utilities/Model/EventCategory';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.scss']
})
export class EventCategoryComponent implements OnInit {
  eventCategoryList: EventCategory[] = [];  // Stores the list of categories
  categoryForm: FormGroup;  // Form group for adding category

  constructor(
    private _formBuilder: FormBuilder, 
    private _router: Router,
    private _event_category_service: EventCategoryServiceService
  ) { 
    // Initialize the form group with validators
    this.categoryForm = this._formBuilder.group({
      category: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9 ]+")]]
    });
  }

  ngOnInit(): void {
    // Check if the user is an admin before allowing access
    if (sessionStorage.getItem("login") == null || sessionStorage.getItem("role") !== "admin") {
      this._router.navigate(["/page_not_found"]);
    } else {
      this.getAllCategory();  // Load categories if authorized
    }
  }

  // Fetches all categories from the backend
  getAllCategory(): void {
    this._event_category_service.getAllCategories().subscribe(
      (resp) => {
        this.eventCategoryList = resp;
      },
      (error) => {
        console.error("Error fetching categories: ", error);
      }
    );
  }

  // Deletes a category by its name
  delete(categoryName: string): void {
    if (confirm(`Are you sure you want to delete the category: ${categoryName}?`)) {
      this._event_category_service.deleteCategory(categoryName).subscribe(
        (res) => {
          alert("Category deleted successfully");
          this.getAllCategory();  // Refresh the list
        },
        (error) => {
          console.error("Error deleting category: ", error);
        }
      );
    }
  }

  // Adds a new category
  addCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory = this.categoryForm.value["category"];
      this._event_category_service.addCategory(newCategory).subscribe(
        (res: any) => {
          alert("Category added successfully");
          this.getAllCategory();  // Refresh the list
          this.categoryForm.reset();  // Reset form after submission
        },
        (error) => {
          console.error("Error adding category: ", error);
        }
      );
    } else {
      alert("Please enter a valid category.");
    }
  }
}
