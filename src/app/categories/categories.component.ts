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
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar class="header">
      <span><img src="assets/ecolab-logo-white-svg.svg" alt="Ecolab Logo" /></span>
      <span class="toolbar-title">Categories</span>
    </mat-toolbar>

    <div class="categories-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Categories</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item *ngFor="let category of categories">
              <div class="category-title">{{ category }}</div>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>

      <div class="footer-bar">
        <span class="footer-title">© Ecolab {{ currentYear || '2025' }}</span>
      </div>
    </div>
  `,
  styles: [`
    .categories-container {
      padding: 76px 24px 84px;
      background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
    }

    mat-card {
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 16px;
    }

    mat-card-title {
      font-size: 24px;
      font-weight: 700;
      color: #2997e3;
    }

    .category-title {
      font-size: 18px;
      font-weight: 600;
      margin: 12px 0;
      color: #333;
    }

    mat-list-item {
      padding: 10px 0;
      font-size: 16px;
      color: #555;
    }

    mat-list-item:hover {
      background-color: #e3f2fd;
      cursor: pointer;
      border-radius: 6px;
    }

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
      border-top: 1px solid #1976d2;
    }

    .footer-title {
      text-align: left;
      width: 100%;
      padding-left: 32px;
    }

    .header {
      display: flex;
      align-items: center;
      height: 56px;
      min-height: 56px;
      padding: 0 24px;
      background-color: #2997e3 !important;
      color: #fff !important;
      position: relative;
    }

    .header img {
      height: 32px;
      margin-right: 16px;
    }

    .toolbar-title {
      flex: 1;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 26px;
      font-weight: 600;
      letter-spacing: 1px;
      width: 400px;
      text-align: center;
      text-shadow: 0 10px 12px rgba(19, 19, 19, 0.25);
    }
  `]
})
export class CategoriesComponent {
  currentYear: number = new Date().getFullYear();

  categories: string[] = [
    'Dishwasher Machine',
    'Food & Beverage',
    'IT',
    'Nalcowater',
    'Healthcare'
  ];
}