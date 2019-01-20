import { Injectable } from '@angular/core';
import { RestService } from './rest-service.service';
import { of, Observable } from 'rxjs';
import { RequestRequirement } from 'src/app/pages/ask/models/requirement';

@Injectable()
export class AskService {

  constructor( private _http: RestService ) { }

  public longPolling(): Observable<string> {
    return this._http.Get( 'http://localhost:3000/api/request' )
  }

  public submit( requestId: string, data: any ): Observable<void> {
    return this._http.Post( 'http://localhost:3001/response', { requestId, data } )
  }

  public blockchainRequest( payload: any ): Observable<string> {
    return this._http.Post( 'http://localhost:3000/api/RequestMatch', payload )
  }
}
