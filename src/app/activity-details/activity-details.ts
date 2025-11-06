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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  shortUrl: string;
  destinastionUrl: string;
  click: number;
  status: string;
  expiryDate: Date;
  qrImg?: string;
}
@Component({
  selector: 'app-activity-details',
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
     MatSlideToggleModule,
       MatSnackBarModule,
       MatProgressSpinnerModule,
       RouterModule,
  ],
  templateUrl: './activity-details.html',
  styleUrl: './activity-details.scss'
})
export class ActivityDetails {
  currentYear: number = new Date().getFullYear();
 userName = 'John Doe';
 displayedColumns: string[] = ['batchName', 'timeStamp','downloadFile'];
  displayedColumnsForFileUpload: string[] = ['fileName', 'timeStamp','downloadFile'];
  displayedColumnsForShortUrlsModifieds: string[] = ['existingShortUrls', 'modifiedShortUrls'];
  batchdataSource = new MatTableDataSource<any>();
  fileUploaddataSource = new MatTableDataSource<any>();
  shortUrlsModifiedsSource = new MatTableDataSource<any>();
   data: PeriodicElement[] = this.batchdataSource.data;
    filtered: PeriodicElement[] = [...this.data];
    // Download ZIP state
  isDownloading = false;
  shortUrlCount: number = 0; // Example count of modified short URLs
   constructor( private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
   
    // load hardcoded activity data
    this.loadBatchData();
    this.loadFileUploadData();
    this.loadShortUrlModifiedData();
    this.shortUrlCount = this.shortUrlsModifiedsSource.data.length;
  }
  loadBatchData(): void {
    this.batchdataSource.data = [
      {
        batchName: 'Batch1 _2023_v2',
        timeStamp: '2025-10-01 09:00 AM',
        downloadFile: 'Download',
      },
      {
        batchName: 'Batch2 _2024_v2',
        timeStamp: '2025-10-02 10:30 AM',
        downloadFile: 'Download',
      },
      {
        batchName: 'Batch3 _2025_v2',
        timeStamp: '2025-10-03 11:15 AM', 
        downloadFile: 'Download',
      }
    ]}
    loadFileUploadData(): void {
    this.fileUploaddataSource.data = [
      {
        fileName: 'document.2023.xlsx',
        timeStamp: '2025-10-01 09:00 AM',
        downloadFile: 'Download',
      },
      {
        fileName: 'document.2024.xlsx',
        timeStamp: '2025-10-02 10:30 AM',
        downloadFile: 'Download',
      },
      {
        fileName: 'document.2025.xlsx',
        timeStamp: '2025-10-03 11:15 AM', 
        downloadFile: 'Download',
      },
        {
        fileName: 'document.2026.xlsx',
        timeStamp: '2025-10-04 01:45 PM', 
        downloadFile: 'Download',
        }
    ]}
     loadShortUrlModifiedData(): void {
    this.shortUrlsModifiedsSource.data = [
      {
        existingShortUrls: 'https://dev.ecl.inc/u3v4w5x6',
        modifiedShortUrls: 'https://vast.ecolab.com/u3v4w5x6',
        countOfShortUrlsModified: '3',
         downloadFile: 'Download',
      },
      {
        existingShortUrls: 'https://dev.ecl.inc/a1b2c3d4',
        modifiedShortUrls: 'https://vast.ecolab.com/a1b2c3d4',    
        countOfShortUrlsModified: '5',
         downloadFile: 'Download',
      },
      {
        existingShortUrls: 'https://dev.ecl.inc/e5f6g7h8',
        modifiedShortUrls: 'https://vast.ecolab.com/e5f6g7h8',
        countOfShortUrlsModified: '2',
          downloadFile: 'Download', 
      },
      {
        existingShortUrls: 'https://dev.ecl.inc/i9j0k1l2',
        modifiedShortUrls: 'https://vast.ecolab.com/i9j0k1l2',
        countOfShortUrlsModified: '4',
          downloadFile: 'Download',
      }
    ]}
     // Download all QR codes as ZIP
  downloadQrZip() {
    if (this.isDownloading) return;

    // Client-side zip: fetch each QR image and add to zip
    this.isDownloading = true;

    (async () => {
      try {
        const JSZipModule = await import('jszip');
        const JSZip = (JSZipModule && (JSZipModule as any).default) || JSZipModule;
        const zip = new JSZip();

        const errors: string[] = [];

        // choose which set to include: use filtered to respect filters, or this.data for full set
        const items = this.filtered && this.filtered.length ? this.filtered : this.data;

        // helper to sanitize filename
        const safeFilename = (s: string, idx: number) => {
          try {
            const url = new URL(s);
            const parts = url.pathname.split('/').filter(Boolean);
            const last = parts.length ? parts[parts.length - 1] : `qr-${idx + 1}`;
            return `${last || 'qr-' + (idx + 1)}.png`;
          } catch {
            // fallback to last path segment from shortUrl or index
            const fallback = s.replace(/[^a-z0-9-_]/gi, '_').slice(0, 40) || `qr-${idx + 1}`;
            return `${fallback}.png`;
          }
        };

        // fetch images serially to reduce concurrent network load; can be parallelized if desired
        for (let i = 0; i < items.length; i++) {
          const it = items[i];
          const imgSrc = it.qrImg || it.shortUrl || '';
          const filename = safeFilename(it.shortUrl || imgSrc, i);

          try {
            // If qrImg looks like a data URL, convert directly
            if (typeof imgSrc === 'string' && imgSrc.startsWith('data:')) {
              // data URL: convert to binary
              const data = imgSrc.split(',')[1];
              const bin = atob(data);
              const len = bin.length;
              const u8 = new Uint8Array(len);
              for (let k = 0; k < len; k++) u8[k] = bin.charCodeAt(k);
              zip.file(filename, u8);
            } else {
              // try fetching the asset (relative URL like 'assets/qrcode.svg' should work)
              const response = await fetch(imgSrc, { cache: 'no-cache' });
              if (!response.ok) throw new Error(`HTTP ${response.status}`);

              // convert to blob then arrayBuffer for zip
              const blob = await response.blob();
              // If SVG, convert to PNG by embedding? For now add original blob contents preserving type
              zip.file(filename, await blob.arrayBuffer());
            }
          } catch (e) {
            console.warn('Failed to fetch QR for', imgSrc, e);
            errors.push(`Failed to include ${it.shortUrl || imgSrc}`);
            // Add a small text file indicating failure for this entry
            zip.file(`${filename}.error.txt`, `Failed to fetch QR image for ${it.shortUrl || imgSrc}: ${String(e)}`);
          }
        }

        const content = await zip.generateAsync({ type: 'blob' });
        const url = window.URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-codes-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        if (errors.length) {
          this.snackBar.open('ZIP created with some missing items. See console for details.', 'Close', { duration: 6000 });
          console.warn('ZIP creation errors:', errors);
        } else {
          this.snackBar.open('QR codes ZIP downloaded successfully!', 'Close', { duration: 3000 });
        }
      } catch (err) {
        console.error('Client-side zip error', err);
        this.snackBar.open('Failed to create ZIP in browser. Please try again.', 'Close', { duration: 5000 });
      } finally {
        this.isDownloading = false;
      }
    })();
  }
}
