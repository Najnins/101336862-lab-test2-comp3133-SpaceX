// src/app/components/missionfilter/missionfilter.component.ts

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule
  ],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.scss']
})
export class MissionFilterComponent implements OnInit {
  @Output() yearSelected = new EventEmitter<string>();
  @Output() filterCleared = new EventEmitter<void>();

  selectedYear: string = '';
  availableYears: string[] = [];

  ngOnInit(): void {
    // Generate years from 2006 (first SpaceX launch) to current year
    const currentYear = new Date().getFullYear();
    for (let y = 2006; y <= currentYear; y++) {
      this.availableYears.push(String(y));
    }
    // Reverse so newest years appear first
    this.availableYears.reverse();
  }

  onYearChange(): void {
    if (this.selectedYear) {
      this.yearSelected.emit(this.selectedYear);
    }
  }

  clearFilter(): void {
    this.selectedYear = '';
    this.filterCleared.emit();
  }

  selectQuickYear(year: string): void {
    this.selectedYear = year;
    this.yearSelected.emit(year);
  }
}
