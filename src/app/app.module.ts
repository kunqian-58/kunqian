import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { BibdialogComponent } from './bibdialog/bibdialog.component';
import { AlanComponent } from './alan/alan.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BibdialogComponent,
    AlanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDividerModule,
    HttpClientModule,
    MatDialogModule
  ],
  entryComponents: [BibdialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
