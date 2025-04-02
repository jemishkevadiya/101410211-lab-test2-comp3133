import { Routes } from '@angular/router';
import { MissionlistComponent } from './missionlist/missionlist.component';
import { MissionfilterComponent } from './missionfilter/missionfilter.component';
import { MissiondetailsComponent } from './missiondetails/missiondetails.component';

export const routes: Routes = [
  { path: '', component: MissionlistComponent },
  { path: 'filter', component: MissionfilterComponent },
  { path: 'mission/:id', component: MissiondetailsComponent, data: { renderMode: 'csr' } }
];