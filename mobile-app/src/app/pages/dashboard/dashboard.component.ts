import { Component, OnInit, OnDestroy } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { DashboardService } from '../../core/services/dashboard.service';
import { takeWhile, takeUntil, switchMap, catchError } from 'rxjs/operators';
import { FileNode } from '../../core/models/file-node'
import { WithdrawDialogComponent } from './withdraw-dialog/withdraw-dialog.component';
import { of, Observable, timer } from 'rxjs';
import { AskComponent } from '../ask/ask.component';
import { AskService } from 'src/app/core/services/ask.service';
@Component( {
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
} )
export class DashboardComponent implements OnDestroy {

  private _alive: boolean;
  public nestedTreeControl: NestedTreeControl<FileNode>;
  public nestedDataSource: MatTreeNestedDataSource<FileNode>;

  private _askModal: boolean;
  private _account: number;
  constructor( private _dashboardService: DashboardService,
    private _askService: AskService, private _dialog: MatDialog, private _snackBar: MatSnackBar ) {
    this._account = 150;
    this._alive = true;
    this._askModal = false;
    this.nestedTreeControl = new NestedTreeControl<FileNode>( this._getChildren );
    this.nestedDataSource = new MatTreeNestedDataSource();

    this._dashboardService.getClientInformations().pipe( takeWhile( () => this._alive ) ).subscribe( ( data ) => {
      this.nestedDataSource.data = data
    } );

    this.refreshInterval$.pipe( takeWhile( () => this._alive && !this._askModal ) ).subscribe( d => {
      this._askModal = true;
      this._dialog.open( AskComponent, {
        width: '100vw',
        height: 'auto',
        data: d
      } ).afterClosed().subscribe( () => {
        this._snackBar.open( 'Data sending, thank you' );
        this._account += 10;
      } );
    } )

  }
  private fetchData$: Observable<string> = this._askService.longPolling();

  private refreshInterval$: Observable<string> = timer( 5000, 10000 )
    .pipe(
      // This kills the request if the user closes the component 
      takeWhile( () => this._alive ),
      // switchMap cancels the last request, if no response have been received since last tick
      switchMap( () => this.fetchData$ ),
      // catchError handles http throws 
      catchError( error => of( error ) )
    );

  ngOnDestroy() {
    this._alive = false;
  }

  hasNestedChild = ( _: number, nodeData: FileNode ) => !nodeData.type;

  private _getChildren = ( node: FileNode ) => node.children;

  public withdraw(): void {
    this._dialog.open( WithdrawDialogComponent, {
      width: '250px',
      height: 'auto'
    } );
  }

  public get account(): number {
    return this._account;
  }

}