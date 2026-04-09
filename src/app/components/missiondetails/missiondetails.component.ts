// src/app/components/missiondetails/missiondetails.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../interfaces/launch.interface';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.scss']
})
export class MissionDetailsComponent implements OnInit {
  /** Can receive launch via @Input() for embedding, or via route param */
  @Input() launch: Launch | null = null;

  loading = true;
  error = false;
  flightNumber: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spacexService: SpacexService
  ) {}

  ngOnInit(): void {
    if (!this.launch) {
      // Load from route parameter
      this.route.paramMap.subscribe(params => {
        const fn = params.get('flightNumber');
        if (fn) {
          this.flightNumber = parseInt(fn, 10);
          this.loadMission(this.flightNumber);
        }
      });
    } else {
      this.loading = false;
    }
  }

  loadMission(flightNumber: number): void {
    this.loading = true;
    this.error = false;
    this.spacexService.getLaunchByFlightNumber(flightNumber).subscribe({
      next: (data) => {
        this.launch = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/missions']);
  }

  getStatusIcon(success: boolean | null): string {
    if (success === null) return 'help_outline';
    return success ? 'check_circle' : 'cancel';
  }

  getStatusLabel(success: boolean | null): string {
    if (success === null) return 'Unknown';
    return success ? 'Launch Successful' : 'Launch Failed';
  }

  getStatusClass(success: boolean | null): string {
    if (success === null) return 'unknown';
    return success ? 'success' : 'failed';
  }

  formatDate(dateStr: string | null): string {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-CA', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
    });
  }
}
