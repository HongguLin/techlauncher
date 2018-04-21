import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {EmployeeCalendarComponent} from "./employee-calendar/employee-calendar.component";
import {ProjectRoasterComponent} from "./project-roaster/project-roaster.component";

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'calendar', component: EmployeeCalendarComponent},
  {path:'roaster', component:ProjectRoasterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}