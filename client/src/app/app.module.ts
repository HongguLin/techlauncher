import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { EmployeeCalendarComponent } from './employee-calendar/employee-calendar.component';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { ProjectRoasterComponent } from './project-roaster/project-roaster.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { DndModule } from 'ngx-drag-drop';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    EmployeeCalendarComponent,
    DialogModalComponent,
    ProjectRoasterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DndModule,MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    MatTabsModule,
    NgbModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
