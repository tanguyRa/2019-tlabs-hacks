import { NgModule, ModuleWithProviders } from '@angular/core';

import { MatTreeModule, MatIconModule, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatButtonModule, MatDialogModule, MatToolbarModule, MatMenuModule, MatListModule } from '@angular/material';


@NgModule( {
  imports: [
    MatIconModule,
    MatTreeModule,
    MatSnackBarModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatMenuModule, MatListModule
  ],
  exports: [
    MatIconModule,
    MatTreeModule,
    MatSnackBarModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatMenuModule, MatListModule
  ],
  declarations: []
} )

export class MaterialModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialModule,
      providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1000 * 6 } }
      ]
    }
  }
}