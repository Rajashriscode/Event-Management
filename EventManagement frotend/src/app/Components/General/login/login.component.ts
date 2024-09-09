import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventCategoryServiceService } from 'src/app/Utilities/APIServices/event-category-service.service';
import { UserServiceService } from 'src/app/Utilities/APIServices/user-service.service';
import { User } from 'src/app/Utilities/Model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any = null;
  user: User = new User();
  roleList: string[] = ["admin", "user", "organizer"];
  isPasswordVisible: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _category_service: EventCategoryServiceService,
    private _user_service: UserServiceService,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      role: ["user", [Validators.required]]
    });
  }

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);
    this.user.email = this.loginForm.value["email"];
    this.user.password = this.loginForm.value["password"];
    this.user.role = this.loginForm.value["role"];
    console.log("email" + this.user.name);
    console.log("email" + this.user.email);
    console.log("email" + this.user.password);
    console.log("email" + this.user.role);

    this._user_service.loginUser(this.user).subscribe(response => {
      this.error = response;
      alert(response);
      if (response == "login successfull") {
        sessionStorage.setItem("email", this.user.email);
        sessionStorage.setItem("role", this.user.role);
        sessionStorage.setItem("login", "false");

        this._user_service.getUserByEmail(this.user.email).subscribe(resp => 
          sessionStorage.setItem("id", String(resp.userId))
        );
        sessionStorage.setItem("login", "true");
        if (sessionStorage.getItem("role") == "user")
          this._router.navigate(["/user/user_account_show_events"]);
        else if (sessionStorage.getItem("role") == "organizer")
          this._router.navigate(["/organizer/organizer_account_show_events"]);
        else if (sessionStorage.getItem("role") == "admin")
          this._router.navigate(["/admin/admin_dashboard"]);
        else {
          this._router.navigate(["/login"]);
        }
      }
    }, error => this.error = error.error);
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  forgotPassword() {
    // Implement forgot password functionality
    console.log("Forgot password clicked");
  }
}
