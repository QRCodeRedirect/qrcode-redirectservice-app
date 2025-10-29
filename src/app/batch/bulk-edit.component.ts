import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { PeriodicElement } from './batch';

export interface BulkEditRow {
  shortUrl: string;
  redirectUrl: string;
  status: string;
}

@Component({
  selector: 'app-bulk-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './bulk-edit.component.html',
  styleUrls: ['./bulk-edit.component.scss']
})
export class BulkEditComponent {
  @Input() data: PeriodicElement[] = [];
  @Output() apply = new EventEmitter<BulkEditRow[]>();
  @Output() close = new EventEmitter<void>();

  fileName: string = '';
  errors: string[] = [];
  preview: BulkEditRow[] = [];

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      this.errors = ['Cannot use multiple files'];
      return;
    }

    const file = target.files[0];
    this.fileName = file.name;
    this.errors = [];
    this.preview = [];

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      try {
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const excelData = <any[]>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

        // Assuming header is in the first row
        const header = excelData[0];
        const shortUrlIndex = header.indexOf('ShortUrl');
        const redirectUrlIndex = header.indexOf('RedirectUrl');
        const statusIndex = header.indexOf('Status');

        if (shortUrlIndex === -1 || redirectUrlIndex === -1 || statusIndex === -1) {
          this.errors.push('Invalid Excel format. Required columns are: ShortUrl, RedirectUrl, Status.');
          return;
        }

        this.preview = excelData.slice(1).map(row => ({
          shortUrl: row[shortUrlIndex],
          redirectUrl: row[redirectUrlIndex],
          status: row[statusIndex]
        }));

      } catch (err) {
        this.errors.push('Error parsing Excel file. Please ensure it is a valid .xlsx file.');
        console.error(err);
      }
    };
    reader.readAsBinaryString(file);
  }

  confirmApply() {
    this.apply.emit(this.preview);
  }

  onClose() {
    this.close.emit();
  }
}