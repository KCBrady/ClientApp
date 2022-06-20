import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { SearchPartiesModel } from '../models/search-parties.model';

@Injectable({
  providedIn: 'root'
})
export class SearchPartiesService {
    // Define Base API
  //apiURL = "https://localhost:44303";
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

  public getSearchPartiesList(postData: any): Observable<SearchPartiesModel> {
    console.log("PostData is: " + JSON.stringify(postData));
    console.log("http Options are : " + JSON.stringify(this.httpOptions.headers));
    return this.http.post<SearchPartiesModel>(this.apiURL + '/api/SearchParties/GetSearchPartiesList', JSON.stringify(postData), this.httpOptions)
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
