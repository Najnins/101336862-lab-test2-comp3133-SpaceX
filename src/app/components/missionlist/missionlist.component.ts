// src/app/components/missionlist/missionlist.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../interfaces/launch.interface';
import { MissionFilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MissionFilterComponent
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss']
})
export class MissionListComponent implements OnInit {
  launches: Launch[] = [];
  filteredLaunches: Launch[] = [];
  loading = true;
  error = false;
  activeYear = '';
  totalCount = 0;

  constructor(
    private spacexService: SpacexService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAllLaunches();
  }

  loadAllLaunches(): void {
    this.loading = true;
    this.error = false;
    this.spacexService.getAllLaunches().subscribe({
      next: (data) => {
        this.launches = data;
        this.filteredLaunches = data;
        this.totalCount = data.length;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
        this.snackBar.open('Failed to load missions. Check your connection.', 'Dismiss', {
          duration: 5000,
          panelClass: ['error-snack']
        });
      }
    });
  }

  onYearSelected(year: string): void {
    this.activeYear = year;
    this.loading = true;
    this.spacexService.getLaunchesByYear(year).subscribe({
      next: (data) => {
        this.filteredLaunches = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  onFilterCleared(): void {
    this.activeYear = '';
    this.filteredLaunches = this.launches;
  }

  viewDetails(launch: Launch): void {
    this.router.navigate(['/missions', launch.flight_number]);
  }

  getStatusColor(success: boolean | null): string {
    if (success === null) return '#ffa726';
    return success ? '#66bb6a' : '#ef5350';
  }

  getStatusLabel(success: boolean | null): string {
    if (success === null) return 'UNKNOWN';
    return success ? 'SUCCESS' : 'FAILED';
  }

  trackByFlight(index: number, launch: Launch): number {
    return launch.flight_number;
  }
}
