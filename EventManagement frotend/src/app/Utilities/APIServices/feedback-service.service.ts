import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../Model/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  private BASE_URL: string = "http://localhost:8085/feedback/";

  constructor(private _httpClient: HttpClient) { }

  addFeedback(feedback: Feedback): Observable<string> {
    return this._httpClient.post<string>(`${this.BASE_URL}addfeedback`, feedback)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this._httpClient.get<Feedback[]>(`${this.BASE_URL}getall`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
