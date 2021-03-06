import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditHoldReleaseComponent } from './credit-hold-release/credit-hold-release.component';
import { HomeComponent } from './home/home.component';
import { AgGridModule } from 'ag-grid-angular';

import { HttpClientModule } from '@angular/common/http';
import { SearchPartiesComponent } from './search-parties/search-parties.component';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';


@NgModule({
  declarations: [
    AppComponent,
    CreditHoldReleaseComponent,
    HomeComponent,
    SearchPartiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    AppRoutingModule,
    MdbCollapseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
