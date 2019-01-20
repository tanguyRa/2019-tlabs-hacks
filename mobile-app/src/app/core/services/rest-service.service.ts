import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestService {

  constructor( private _http: HttpClient ) { }

  public Get( url: string, headers: HttpHeaders = null ): Observable<any> {
    return this._http.get( url, {
      withCredentials: true,
      headers: headers
    } ).pipe(
      catchError( error => {
        return throwError( error );
      } ) );

  }


  public Post( url: string, body: any, headers: HttpHeaders = null ): Observable<any> {
    return this._http.post( url, body, {
      withCredentials: true,
      headers: headers
    }
    ).pipe(
      catchError( error => {
        return throwError( error );
      } ) );

  }

}
