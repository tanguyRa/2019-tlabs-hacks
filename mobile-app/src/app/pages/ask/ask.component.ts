import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AskService } from 'src/app/core/services/ask.service';
import { takeWhile } from 'rxjs/operators';
import { RequestRequirement } from './models/requirement';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';

@Component( {
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
} )
export class AskComponent implements OnDestroy {

  private _alive: boolean;

  private _request: RequestRequirement;
  constructor( @Inject( MAT_DIALOG_DATA ) public data: RequestRequirement, private _askService: AskService,
    private _dialogRef: MatDialogRef<AskComponent> ) {
    this._alive = true;
    this._request = data[0];
    this._request.company = this._request.company.split( '#' )[1];
  }

  ngOnDestroy() {
    this._alive = false;
  }

  public submit() {
    forkJoin( [
      this._askService.blockchainRequest(
        {
          "$class": "org.hackathon.RequestMatch",
          "request": 'resource:org.hackathon.Individual#' + this._request.company,
          "individual": 'resource:org.hackathon.Individual#USER_1',
          "status": "YES",
          "data": [],
        } )] )
      .pipe( takeWhile( () => this._alive ) ).subscribe( () => {
        this._dialogRef.close();
      } );
  }
  public get request(): RequestRequirement {
    return this._request;
  }


}
