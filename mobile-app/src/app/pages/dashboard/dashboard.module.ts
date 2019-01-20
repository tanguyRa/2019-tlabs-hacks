import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../../core/material.module'
import { SharedModule } from '../../core/shared.module';
import { WithdrawDialogComponent } from './withdraw-dialog/withdraw-dialog.component'
import { AskComponent } from '../ask/ask.component';

@NgModule( {
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [DashboardComponent, WithdrawDialogComponent, AskComponent],
  entryComponents: [WithdrawDialogComponent, AskComponent]
} )
export class DashboardModule { }
