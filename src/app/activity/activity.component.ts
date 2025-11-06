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
 userName = 'John Doe';
  // Table related
  displayedColumns: string[] = ['user', 'batchCreated','filesUploaded','shortUrls', 'filesDeleted', 'createdDate'];
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
        batchCreated: 3,
        shortUrls: 4,
        filesUploaded:4,
        filesDeleted: 3,
        createdDate: '2025-10-01 05:00 PM'
      },
      // {
      //   user: 'Jane Smith',
      //   loginTime: '2025-10-01 08:45 AM',
      //   logoutTime: '2025-10-01 04:30 PM',
      //   batchCreated: 3,
      //   shortUrls: 90,
      //   filesUploaded: 8,
      //   filesDeleted: 1,
      //   createdDate: '2025-10-01 04:30 PM'
      // },
      // {
      //   user: 'Michael Lee',
      //   loginTime: '2025-10-02 09:15 AM',
      //   logoutTime: '2025-10-02 05:15 PM',
      //   batchCreated: 4,
      //   shortUrls: 120,
      //   filesUploaded: 15,
      //   filesDeleted: 2,
      //   createdDate: '2025-10-02 05:15 PM'
      // },
      // {
      //   user: 'Sara Khan',
      //   loginTime: '2025-10-02 09:00 AM',
      //   logoutTime: '2025-10-02 05:00 PM',
      //   batchCreated: 2,
      //   shortUrls: 60,
      //   filesUploaded: 10,
      //   filesDeleted: 0,
      //   createdDate: '2025-10-02 05:00 PM'
      // },
      // {
      //   user: 'David Chen',
      //   loginTime: '2025-10-03 08:30 AM',
      //   logoutTime: '2025-10-03 04:45 PM',
      //   batchCreated: 6,  
      //   shortUrls: 180,
      //   filesUploaded: 7,
      //   filesDeleted: 4,
      //   createdDate: '2025-10-03 04:45 PM'
      // },
      // {
      //   user: 'Emily Davis',
      //   loginTime: '2025-10-03 09:00 AM',
      //   logoutTime: '2025-10-03 05:30 PM',    
      //   batchCreated: 5,
      //   shortUrls: 150,
      //   filesUploaded: 12,
      //   filesDeleted: 2,
      //   createdDate: '2025-10-03 05:30 PM'
      // }
      
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