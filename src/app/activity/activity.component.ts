import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { ActivityService, ActivityStats } from './activity.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
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

  // Table related
  displayedColumns: string[] = ['user', 'loginTime', 'logoutTime', 'filesUploaded', 'filesDeleted', 'createdDate'];
  dataSource = new MatTableDataSource<any>();
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.fetchStats();
    // load hardcoded activity data
    this.loadActivityData();
  }

  fetchStats(): void {
    this.stats$ = this.activityService.getActivityStats();
  }

  loadActivityData(): void {
    this.dataSource.data = [
      {
        user: 'John Doe',
        loginTime: '2025-10-01 09:00 AM',
        logoutTime: '2025-10-01 05:00 PM',
        filesUploaded: 12,
        filesDeleted: 3,
        createdDate: '2025-10-01'
      },
      {
        user: 'Jane Smith',
        loginTime: '2025-10-01 08:45 AM',
        logoutTime: '2025-10-01 04:30 PM',
        filesUploaded: 8,
        filesDeleted: 1,
        createdDate: '2025-10-01'
      },
      {
        user: 'Michael Lee',
        loginTime: '2025-10-02 09:15 AM',
        logoutTime: '2025-10-02 05:15 PM',
        filesUploaded: 15,
        filesDeleted: 2,
        createdDate: '2025-10-02'
      },
      {
        user: 'Sara Khan',
        loginTime: '2025-10-02 09:00 AM',
        logoutTime: '2025-10-02 05:00 PM',
        filesUploaded: 10,
        filesDeleted: 0,
        createdDate: '2025-10-02'
      },
      {
        user: 'David Chen',
        loginTime: '2025-10-03 08:30 AM',
        logoutTime: '2025-10-03 04:45 PM',
        filesUploaded: 7,
        filesDeleted: 4,
        createdDate: '2025-10-03'
      },
      {
        user: 'Emily Davis',
        loginTime: '2025-10-03 09:10 AM',
        logoutTime: '2025-10-03 05:10 PM',
        filesUploaded: 11,
        filesDeleted: 2,
        createdDate: '2025-10-03'
      },
      {
        user: 'Robert Patel',
        loginTime: '2025-10-04 09:00 AM',
        logoutTime: '2025-10-04 05:00 PM',
        filesUploaded: 9,
        filesDeleted: 1,
        createdDate: '2025-10-04'
      },
      {
        user: 'Linda Brown',
        loginTime: '2025-10-04 08:50 AM',
        logoutTime: '2025-10-04 04:50 PM',
        filesUploaded: 13,
        filesDeleted: 3,
        createdDate: '2025-10-04'
      },
      {
        user: 'Kevin White',
        loginTime: '2025-10-05 09:05 AM',
        logoutTime: '2025-10-05 05:05 PM',
        filesUploaded: 6,
        filesDeleted: 0,
        createdDate: '2025-10-05'
      },
      {
        user: 'Aisha Roy',
        loginTime: '2025-10-05 09:20 AM',
        logoutTime: '2025-10-05 05:20 PM',
        filesUploaded: 14,
        filesDeleted: 2,
        createdDate: '2025-10-05'
      }
    ];
  }

  ngAfterViewInit(): void {
    // attach paginator/sort after view init
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filter: string) {
    this.filterValue = filter;
    this.dataSource.filter = (filter || '').trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  onRefresh(): void {
    this.fetchStats();
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }
}