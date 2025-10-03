import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, RouterModule, MatIconModule, MatButtonModule, MatToolbarModule],
  template: `
    <mat-toolbar class="header">
      <span><img src="assets/ecolab-logo-white-svg.svg" alt="Ecolab Logo" /></span>
      <span class="toolbar-title">Categories</span>
    </mat-toolbar>

    <div class="categories-container" style="padding-top:76px; padding-bottom:84px;">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Categories</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              <div class="category-title">Dishwasher Machine</div>
              <mat-list dense>
                <mat-list-item>Commercial Dishwashers</mat-list-item>
                <mat-list-item>Industrial Washers</mat-list-item>
              </mat-list>
            </mat-list-item>

            <mat-list-item>
              <div class="category-title">Food & Beverage</div>
              <mat-list dense>
                <mat-list-item>Beverage Equipment</mat-list-item>
                <mat-list-item>Food Prep</mat-list-item>
                <mat-list-item>Storage</mat-list-item>
              </mat-list>
            </mat-list-item>

            <mat-list-item>
              <div class="category-title">IT</div>
              <mat-list dense>
                <mat-list-item>Networking</mat-list-item>
                <mat-list-item>Endpoints</mat-list-item>
              </mat-list>
            </mat-list-item>

            <mat-list-item>
              <div class="category-title">Nalcowater</div>
              <mat-list dense>
                <mat-list-item>Water Treatment</mat-list-item>
                <mat-list-item>Pumps & Valves</mat-list-item>
              </mat-list>
            </mat-list-item>

            <mat-list-item>
              <div class="category-title">Healthcare</div>
              <mat-list dense>
                <mat-list-item>Sanitization</mat-list-item>
                <mat-list-item>Medical Equipment</mat-list-item>
              </mat-list>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>

      
<div class="footer-bar">
  <span class="footer-title">© Ecolab {{ currentYear || '2025' }}</span>
</div>
    </div>
  `,
  styles: [
    `
      .categories-container { padding: 24px; }
      .category-title { font-weight: 600; margin-bottom: 4px; }
      mat-list-item { display: block; padding: 8px 0; }
      mat-list mat-list-item { padding-left: 16px; }
      .footer-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 56px;
  background-color: #2997e3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  z-index: 100;
  border-top: 1px solid #1976d2; // Optional: darker blue border
}

.footer-title {
  text-align: left;
  width: 100%;
  padding-left: 32px;
}

    `
  ]
})
export class CategoriesComponent {
  // used by footer
  currentYear: number = new Date().getFullYear();
}
