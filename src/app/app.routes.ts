// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { MissionListComponent } from './components/missionlist/missionlist.component';
import { MissionDetailsComponent } from './components/missiondetails/missiondetails.component';

export const routes: Routes = [
  { path: '', redirectTo: 'missions', pathMatch: 'full' },
  { path: 'missions', component: MissionListComponent },
  { path: 'missions/:flightNumber', component: MissionDetailsComponent },
  { path: '**', redirectTo: 'missions' }
];
