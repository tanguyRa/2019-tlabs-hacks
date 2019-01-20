import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component( {
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.css']
} )
export class WithdrawDialogComponent implements OnInit {

  constructor( private _dialogRef: MatDialogRef<WithdrawDialogComponent> ) { }

  ngOnInit() {
  }

}
