import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
