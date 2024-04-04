import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {ParcelFormComponent} from "./parcel-form/parcel-form.component";
import {ParcelListComponent} from './parcel-list/parcel-list.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ParcelFormComponent,
    ParcelListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
