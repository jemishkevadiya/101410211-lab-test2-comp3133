import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MissionlistComponent } from './app/missionlist/missionlist.component';
import { MissiondetailsComponent } from './app/missiondetails/missiondetails.component';
import { MissionfilterComponent } from './app/missionfilter/missionfilter.component';
import { provideAnimations } from '@angular/platform-browser/animations';


const routes = [
  { path: '', component: MissionlistComponent },
  { path: 'filter', component: MissionfilterComponent },
  { path: 'mission/:id', component: MissiondetailsComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations()
  ]
}).catch(err => console.error(err));