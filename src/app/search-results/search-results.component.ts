import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="search-results">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Search Results</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>No search executed. This is a placeholder Search Results page.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .search-results { padding: 14px; }  //24
    `
  ]
})
export class SearchResultsComponent {}
