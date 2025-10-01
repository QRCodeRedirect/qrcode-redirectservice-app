import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

// export interface AssetRecord {
//   id: number;
//   name: string;
//   date: string;
// }

// const ELEMENT_DATA: AssetRecord[] = [
//   { id: 1, name: 'Asset 1', date: '2023-10-27' },
//   { id: 2, name: 'Asset 2', date: '2023-10-26' },
//   { id: 3, name: 'Asset 3', date: '2023-10-25' },
//   { id: 4, name: 'Asset 4', date: '2023-10-24' },
//   { id: 5, name: 'Asset 5', date: '2023-10-23' },
//   { id: 6, name: 'Asset 6', date: '2023-10-22' },
//   { id: 7, name: 'Asset 7', date: '2023-10-21' },
//   { id: 8, name: 'Asset 8', date: '2023-10-20' },
//   { id: 9, name: 'Asset 9', date: '2023-10-19' },
//   { id: 10, name: 'Asset 10', date: '2023-10-18' },
// ];

export interface AssetRecord {
  id: number;
  aliasId: string;
  date: string;
  appUrl: string;
  imageUrl: string;
  category: string;
  CreatedBy: string;
  CreatedDate: string;
  ModifiedBy: string;
  ModifiedDate: string; // This was missing
}




const ELEMENT_DATA: AssetRecord[] = [
  {
    id: 1,
    aliasId: 'a1b2c3d4',
    date: '2023-10-01',
    appUrl: 'https://vast.ecolab.com/a1b2c3d4',
    imageUrl: 'https://dev.ecl.inc/a1b2c3d4',
    category: 'Dishmachine',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-01',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-15'
  },
  {
    id: 2,
    aliasId: 'e5f6g7h8',
    date: '2023-10-02',
    appUrl: 'https://vast.ecolab.com/e5f6g7h8',
    imageUrl: 'https://dev.ecl.inc/e5f6g7h8',
    category: 'Laundry',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-02',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-16'
  },
  {
    id: 3,
    aliasId: 'i9j0k1l2',
    date: '2023-10-03',
    appUrl: 'https://vast.ecolab.com/i9j0k1l2',
    imageUrl: 'https://dev.ecl.inc/i9j0k1l2',
    category: 'Sanitizer',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-03',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-17'
  },
  {
    id: 4,
    aliasId: 'm3n4o5p6',
    date: '2023-10-04',
    appUrl: 'https://vast.ecolab.com/m3n4o5p6',
    imageUrl: 'https://dev.ecl.inc/m3n4o5p6',
    category: 'Detergent',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-04',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-18'
  },
  {
    id: 5,
    aliasId: 'q7r8s9t0',
    date: '2023-10-05',
    appUrl: 'https://vast.ecolab.com/q7r8s9t0',
    imageUrl: 'https://dev.ecl.inc/q7r8s9t0',
    category: 'Dishmachine',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-05',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-19'
  },
  {
    id: 6,
    aliasId: 'u1v2w3x4',
    date: '2023-10-06',
    appUrl: 'https://vast.ecolab.com/u1v2w3x4',
    imageUrl: 'https://dev.ecl.inc/u1v2w3x4',
    category: 'Laundry',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-06',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-20'
  },
  {
    id: 7,
    aliasId: 'y5z6a7b8',
    date: '2023-10-07',
    appUrl: 'https://vast.ecolab.com/y5z6a7b8',
    imageUrl: 'https://dev.ecl.inc/y5z6a7b8',
    category: 'Sanitizer',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-07',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-21'
  },
  {
    id: 8,
    aliasId: 'c9d0e1f2',
    date: '2023-10-08',
    appUrl: 'https://vast.ecolab.com/c9d0e1f2',
    imageUrl: 'https://dev.ecl.inc/c9d0e1f2',
    category: 'Detergent',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-08',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-22'
  },
  {
    id: 9,
    aliasId: 'g3h4i5j6',
    date: '2023-10-09',
    appUrl: 'https://vast.ecolab.com/g3h4i5j6',
    imageUrl: 'https://dev.ecl.inc/g3h4i5j6',
    category: 'Dishmachine',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-09',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-23'
  },
  {
    id: 10,
    aliasId: 'k7l8m9n0',
    date: '2023-10-10',
    appUrl: 'https://vast.ecolab.com/k7l8m9n0',
    imageUrl: 'https://dev.ecl.inc/k7l8m9n0',
    category: 'Laundry',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-10',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-24'
  },
  {
    id: 11,
    aliasId: 'o1p2q3r4',
    date: '2023-10-11',
    appUrl: 'https://vast.ecolab.com/o1p2q3r4',
    imageUrl: 'https://dev.ecl.inc/o1p2q3r4',
    category: 'Sanitizer',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-11',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-25'
  },
  {
    id: 12,
    aliasId: 's5t6u7v8',
    date: '2023-10-12',
    appUrl: 'https://vast.ecolab.com/s5t6u7v8',
    imageUrl: 'https://dev.ecl.inc/s5t6u7v8',
    category: 'Detergent',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-12',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-26'
  },
  {
    id: 13,
    aliasId: 'w9x0y1z2',
    date: '2023-10-13',
    appUrl: 'https://vast.ecolab.com/w9x0y1z2',
    imageUrl: 'https://dev.ecl.inc/w9x0y1z2',
    category: 'Dishmachine',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-13',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-27'
  },
  {
    id: 14,
    aliasId: 'a3b4c5d6',
    date: '2023-10-14',
    appUrl: 'https://vast.ecolab.com/a3b4c5d6',
    imageUrl: 'https://dev.ecl.inc/a3b4c5d6',
    category: 'Laundry',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-14',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-28'
  },
  {
    id: 15,
    aliasId: 'e7f8g9h0',
    date: '2023-10-15',
    appUrl: 'https://vast.ecolab.com/e7f8g9h0',
    imageUrl: 'https://dev.ecl.inc/e7f8g9h0',
    category: 'Sanitizer',
    CreatedBy: 'admin',
    CreatedDate: '2023-09-15',
    ModifiedBy: 'admin',
    ModifiedDate: '2023-09-29'
  },
  
  {
  id: 16,
  aliasId: 'i1j2k3l4',
  date: '2023-10-16',
  appUrl: 'https://vast.ecolab.com/i1j2k3l4',
  imageUrl: 'https://dev.ecl.inc/i1j2k3l4',
  category: 'Detergent',
  CreatedBy: 'admin',
  CreatedDate: '2023-09-16',
  ModifiedBy: 'admin',
  ModifiedDate: '2023-09-30'
},
{
  id: 17,
  aliasId: 'm5n6o7p8',
  date: '2023-10-17',
  appUrl: 'https://vast.ecolab.com/m5n6o7p8',
  imageUrl: 'https://dev.ecl.inc/m5n6o7p8',
  category: 'Dishmachine',
  CreatedBy: 'admin',
  CreatedDate: '2023-09-17',
  ModifiedBy: 'admin',
  ModifiedDate: '2023-10-01'
},
{
  id: 18,
  aliasId: 'q9r0s1t2',
  date: '2023-10-18',
  appUrl: 'https://vast.ecolab.com/q9r0s1t2',
  imageUrl: 'https://dev.ecl.inc/q9r0s1t2',
  category: 'Laundry',
  CreatedBy: 'admin',
  CreatedDate: '2023-09-18',
  ModifiedBy: 'admin',
  ModifiedDate: '2023-10-02'
},
{
  id: 19,
  aliasId: 'u3v4w5x6',
  date: '2023-10-19',
  appUrl: 'https://vast.ecolab.com/u3v4w5x6',
  imageUrl: 'https://dev.ecl.inc/u3v4w5x6',
  category: 'Sanitizer',
  CreatedBy: 'admin',
  CreatedDate: '2023-09-19',
  ModifiedBy: 'admin',
  ModifiedDate: '2023-10-03'
},
{
  id: 20,
  aliasId: 'y7z8a9b0',
  date: '2023-10-20',
  appUrl: 'https://vast.ecolab.com/y7z8a9b0',
  imageUrl: 'https://dev.ecl.inc/y7z8a9b0',
  category: 'Detergent',
  CreatedBy: 'admin',
  CreatedDate: '2023-09-20',
  ModifiedBy: 'admin',
  ModifiedDate: '2023-10-04'
}

];



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  welcomeMessage: string = '';
  currentYear = new Date().getFullYear();
  

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    // filter predicate to search across aliasId, appUrl, imageUrl, category
    this.dataSource.filterPredicate = (data: AssetRecord, filter: string) => {
      const f = (filter || '').trim().toLowerCase();
      return (
        (data.aliasId || '').toLowerCase().includes(f) ||
        (data.appUrl || '').toLowerCase().includes(f) ||
        (data.imageUrl || '').toLowerCase().includes(f) ||
        (data.category || '').toLowerCase().includes(f)
      );
    };
  }

  // navigate programmatically as a fallback for menu/link issues
  navigate(path: string) {
    // Use router.navigate to ensure SPA navigation
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const username = navigation?.extras.state?.['username'];
    const displayName = username ? username.charAt(0).toUpperCase() + username.slice(1) : 'User';
    this.welcomeMessage = `Hi ${displayName}, Welcome to our DaaS QR Code.`;
  }

  displayedColumns: string[] = [
  'id',
  'aliasId',
  'date',
  'appUrl',
  'imageUrl',
  'category',
  'CreatedBy',
  'CreatedDate',
  'ModifiedBy', // This was missing
  'ModifiedDate' // This was missing
];

  dataSource: MatTableDataSource<AssetRecord>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  onSearch(): void {
    // Implement search logic or navigation
  }

  applyFilter(value: string) {
    this.dataSource.filter = (value || '').trim().toLowerCase();
    if (this.paginator) this.paginator.firstPage();
  }

}

