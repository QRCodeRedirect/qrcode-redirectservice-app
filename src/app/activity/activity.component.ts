import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { ActivityService, ActivityStats } from './activity.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  private activityService = inject(ActivityService);
  private router = inject(Router);

  stats$!: Observable<ActivityStats>;
  // used by the footer in the template
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.stats$ = this.activityService.getActivityStats();
  }

  onRefresh(): void {
    this.fetchStats();
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }
}