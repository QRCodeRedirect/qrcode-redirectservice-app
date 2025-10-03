import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

export interface UrlRecord {
  'S.No': number;
  'Short URL': string;
  'Destination URL': string;
}

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements AfterViewInit {
  displayedColumns: string[] = ['S.No', 'Short URL', 'Destination URL'];
  dataSource = new MatTableDataSource<UrlRecord>();
  recordCount = 0;
  filterValue: string = '';
  // used by the footer in the template
  currentYear: number = new Date().getFullYear();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router: Router) {
    // configure filter predicate to search both columns
    this.dataSource.filterPredicate = (data: UrlRecord, filter: string) => {
      const f = filter.trim().toLowerCase();
      const shortUrl = (data['Short URL'] || '').toLowerCase();
      const dest = (data['Destination URL'] || '').toLowerCase();
      return shortUrl.indexOf(f) >= 0 || dest.indexOf(f) >= 0;
    };
  }

  ngAfterViewInit() {
    // attach paginator after view init
    this.dataSource.paginator = this.paginator;
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // Convert sheet to JSON and add Serial Number
      const data: any[] = XLSX.utils.sheet_to_json(ws);
      const formattedData: UrlRecord[] = data.map((row, index) => ({
        'S.No': index + 1,
        'Short URL': row['Short URL'],
        'Destination URL': row['Destination URL'],
      }));

      this.dataSource.data = formattedData;
      this.recordCount = formattedData.length;
      // Re-assign the paginator to the data source to ensure it works after new data is loaded.
      // ensure paginator is attached after data assignment and view updates
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        if (this.paginator) this.paginator.firstPage();
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  applyFilter(filter: string) {
    this.filterValue = filter;
    this.dataSource.filter = (filter || '').trim().toLowerCase();
    // reset paginator to first page when filtering
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
}