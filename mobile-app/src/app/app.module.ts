import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { MaterialModule } from './core/material.module';
import { SharedModule } from './core/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule( {
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    MaterialModule.forRoot(),
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
} )
export class AppModule { }
