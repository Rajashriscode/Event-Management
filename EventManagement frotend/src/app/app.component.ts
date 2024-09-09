import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EventManagement';
  role: string = '';
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
     console.log('>>>>>>>', sessionStorage);
     const sessionRole = sessionStorage.getItem("role");
     if (sessionRole) {
      this.role = sessionRole;
     } else {
      this.role = '';
     }
    });

  }
}
