import { FormsModule } from "@angular/forms";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardService } from './services/dashboard.service'
import { RestService } from "./services/rest-service.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AskService } from './services/ask.service';


@NgModule( {
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: []
} )
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        RestService,
        DashboardService,
        AskService
      ]
    };
  }
}
