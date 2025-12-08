import { Component, OnInit } from '@angular/core';
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
import { BulkEditComponent, BulkEditRow } from './bulk-edit.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../create-batch/auth.service';

export interface PeriodicElement {
  shortUrl: string;
  destinastionUrl: string;
  click: number;
  status: string;
  expiryDate: Date;
  qrImg?: string;
}

export interface ShortUrlResponse {
  GeneratedShortUrl: string;
  DestinationUrl: string;
}


@Component({
  selector: 'app-batch',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  MatMenuModule,
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
    BulkEditComponent,
    RouterModule,
  ],
  templateUrl: './batch.html',
  styleUrl: './batch.scss',
})
export class Batch implements OnInit {
  displayedColumns: string[] = ['shortUrl', 'destinastionUrl','qrImg', 'click', 'status', 'expiryDate', 'actions'];

  // dataset and view state
  data: PeriodicElement[] = [];
  filtered: PeriodicElement[] = [];
  paged: PeriodicElement[] = [];

  // metrics (calculated from API data)
  get totalUrls() { return this.data.length; }
  get activeUrls() { return this.data.filter(d => d.status === 'Active').length; }
  get totalClicks() { return this.data.reduce((sum, d) => sum + d.click, 0); }
  get avgClicks() { return this.totalUrls ? this.totalClicks / this.totalUrls : 0; }

  // filters and pagination
  search = '';
  statusFilter = '';
  pageIndex = 0;
  pageSize = 5;
  get totalPages() { return Math.ceil(this.filtered.length / this.pageSize) || 1; }
  get startIndex() { return this.pageIndex * this.pageSize; }

  userName = 'John Doe';
  isAdmin = false;
  currentYear = new Date().getFullYear();

  // Download ZIP state
  isDownloading = false;
  // Exporting Excel state
  isExporting = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set user info from AuthService
    this.userName = this.authService.currentUserValue?.name || 'User';
    this.isAdmin = this.authService.isAdmin();
    this.fetchShortUrls();
  }

  fetchShortUrls() {
    this.http.get<ShortUrlResponse[]>('https://localhost:7106/api/Batches/short-urls').subscribe({
      next: (response) => {
        this.data = response.map(item => ({
          shortUrl: item.GeneratedShortUrl,
          destinastionUrl: item.DestinationUrl,
          click: 0, // default values since API doesn't provide
          status: 'Active',
          expiryDate: new Date(),
          qrImg: 'assets/qrcode.svg'
        }));
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error fetching short URLs:', err);
        if (err.status === 404) {
          this.snackBar.open('No short URLs found', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Error loading short URLs', 'Close', { duration: 3000 });
        }
        // No fallback to mock data - only display API values
        this.data = [];
        this.applyFilter();
      }
    });
  }

  // bulk edit modal state
  showBulkEdit = false;

  // called when bulk edit component emits apply with rows to update
  onBulkApply(rows: BulkEditRow[]) {
    if (!rows || !rows.length) return;
    for (const r of rows) {
      if (r.shortUrl && r.redirectUrl) {
        const dataEntry = this.data.find(d => d.shortUrl === r.shortUrl);
        if (dataEntry) {
          dataEntry.destinastionUrl = r.redirectUrl;
        }
      }
    }
    // refresh current view
    this.applyFilter();
    this.showBulkEdit = false;
  }

  closeBulkEdit() {
    this.showBulkEdit = false;
  }

  deleteRow(elementToDelete: PeriodicElement) {
    const index = this.data.findIndex(d => d.shortUrl === elementToDelete.shortUrl);
    if (index > -1) {
      this.data.splice(index, 1);
      // Re-apply filtering and pagination to update the UI
      this.applyFilter();
    }
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

  // Export current filtered view to Excel (.xlsx)
  async exportToExcel() {
    if (this.isExporting) return;
    this.isExporting = true;

    try {
      const XLSX = await import('xlsx');

      // Export the filtered data (current view). You can change to this.paged if you want only current page.
      const rows = this.filtered.map(r => ({
        'Short URL': r.shortUrl,
        'Destination URL': r.destinastionUrl,
        'Clicks': r.click,
        'Status': r.status,
        'Expiry': r.expiryDate ? (new Date(r.expiryDate)).toLocaleDateString() : ''
      }));

      const ws = XLSX.utils.json_to_sheet(rows, { header: ['Short URL','Destination URL','Clicks','Status','Expiry'] });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'URLs');

      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `urls-export-${new Date().toISOString().slice(0,19).replace(/:/g,'-')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      this.snackBar.open('Export successful.', 'Close', { duration: 3000 });
    } catch (e) {
      console.error('Export error', e);
      this.snackBar.open('Export failed. Please try again.', 'Close', { duration: 5000 });
    } finally {
      this.isExporting = false;
    }
  }

  // Toggle status handler for slide toggle
  toggleStatus(entry: PeriodicElement, checked: boolean) {
    entry.status = checked ? 'Active' : 'InActive';
    this.snackBar.open(`Status: ${entry.status}`, 'Close', { duration: 1500 });
  }

  // Navigate to Advanced Search page. Optionally include a query param so advanced search can prefill.
  navigateToAdvancedSearch(element?: PeriodicElement) {
    const query = element && element.shortUrl ? element.shortUrl : '';
    this.router.navigate(['/advanced-search'], { queryParams: { q: query } });
  }
}
