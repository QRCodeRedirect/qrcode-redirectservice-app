import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

export interface PeriodicElement {
  shortUrl: string;
  destinastionUrl: string;
  click: number;
  status: string;
  expiryDate: Date;
  qrImg?: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    shortUrl: 'https://dev.ecl.inc/u3v4w5x6',
    destinastionUrl: 'https://vast.ecolab.com/u3v4w5x6',
    qrImg: 'assets/qrcode.svg',
    click: 1247,
    status: 'Active',
    expiryDate: new Date('2024-09-15')
  },
  {
    shortUrl: 'https://dev.ecl.inc/a1b2c3d4',
    destinastionUrl: 'https://vast.ecolab.com/a1b2c3d4',
    qrImg: 'assets/qrcode.svg',
    click: 823,
    status: 'Active',
    expiryDate: new Date('2024-09-12')
  },
  {
    shortUrl: 'https://dev.ecl.inc/e5f6g7h8',
    destinastionUrl: 'https://vast.ecolab.com/e5f6g7h8',
    qrImg: 'assets/qrcode.svg',
    click: 1891,
    status: 'Active',
    expiryDate: new Date('2024-09-11')
  },
  {
    shortUrl: 'https://dev.ecl.inc/i9j0k1l2',
    destinastionUrl: 'https://vast.ecolab.com/i9j0k1l2',
    qrImg: 'assets/qrcode.svg',
    click: 456,
    status: 'Active',
    expiryDate: new Date('2024-09-10')
  },
  {
    shortUrl: 'https://dev.ecl.inc/m3n4o5p6',
    destinastionUrl: 'https://vast.ecolab.com/m3n4o5p6',
    qrImg: 'assets/qrcode.svg',
    click: 210,
    status: 'Active',
    expiryDate: new Date('2023-12-05')
  }
];


@Component({
  selector: 'app-batch',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    ClipboardModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './batch.html',
  styleUrl: './batch.scss',
})
export class Batch {
  displayedColumns: string[] = ['shortUrl', 'destinastionUrl','qrImg', 'click', 'status', 'expiryDate', 'actions'];

  // dataset and view state
  data: PeriodicElement[] = ELEMENT_DATA;
  filtered: PeriodicElement[] = [...this.data];
  paged: PeriodicElement[] = [];

  // metrics (mocked from dataset)
  totalUrls = this.data.length * 2500; // example to display large number like screenshot
  activeUrls = Math.round(this.totalUrls * 0.9847);
  totalClicks = 52300;
  get avgClicks() { return this.totalUrls ? this.totalClicks / this.totalUrls : 0; }

  // filters and pagination
  search = '';
  statusFilter = '';
  pageIndex = 0;
  pageSize = 5;
  get totalPages() { return Math.ceil(this.filtered.length / this.pageSize) || 1; }
  get startIndex() { return this.pageIndex * this.pageSize; }

  userName = 'John Doe';
  currentYear = new Date().getFullYear();

  constructor() {
    this.applyFilter();
  }

  applyFilter() {
    const q = this.search.toLowerCase();
    this.filtered = this.data.filter(r => {
      const matchesSearch = !q || r.shortUrl.toLowerCase().includes(q) || r.destinastionUrl.toLowerCase().includes(q);
      const matchesStatus = !this.statusFilter || r.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
    this.pageIndex = 0;
    this.slicePage();
  }

  clearSearch() {
    this.search = '';
    this.applyFilter();
  }

  slicePage() {
    const start = this.startIndex;
    this.paged = this.filtered.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.slicePage();
    }
  }

  prevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.slicePage();
    }
  }
}
