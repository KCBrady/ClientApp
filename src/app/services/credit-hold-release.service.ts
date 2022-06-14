import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CreditHoldAndReleaseDealModel } from '../models/credit-hold-release-deal.model';

@Injectable({
  providedIn: 'root'
})
export class CreditHoldReleaseService {
    // Define Base API
  //apiURL = "https://localhost:44341";
  apiURL = "https://localhost:443";

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST'
        })
    }

    constructor(private http: HttpClient) { }

  public getCreditHoldRelease(postData: any): Observable<CreditHoldAndReleaseDealModel> {
    console.log("PostData is: " + JSON.stringify(postData));
    console.log("http Options are : " + JSON.stringify(this.httpOptions.headers));
    return this.http.post<CreditHoldAndReleaseDealModel>(this.apiURL + '/api/CreditHoldAndReleaseDeal/GetCreditHoldAndReleaseDealList', JSON.stringify(postData), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    // Error handling 
    handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
