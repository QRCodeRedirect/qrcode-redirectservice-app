import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-generateqrcode',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './generateqrcode.component.html',
  styleUrl: './generateqrcode.component.scss'
})
export class GenerateqrcodeComponent {
  // Current year for footer
  currentYear: number = new Date().getFullYear();

  // Function Type selection: 'shortUrl' or 'redirectUrl'
  selectedFunctionType: string = 'shortUrl';

  // Mode selection: 'manualEntry' or 'fileUpload'
  selectedMode: string = 'manualEntry';

  // Division, Application, QR Code Type, Qty selectors (kept for right panel)
  selectedDivision: string = 'Healthcare';
  selectedApplication: string = 'Digital Kitchen';
  selectedQrCodeType: string = 'Single URL Re-direct';
  selectedQrCodeQty: string = 'Single';

  // Manual entry textareas
  selectedShortUrl: string = '';
  selectedRedirectUrl: string = '';

  // For redirectUrl mode
  quantity: number = 1;
  redirectUrls: string[] = [];
  aliasIds: string[] = [];

  // File upload data
  shortUrlData: string[] = [];
  redirectUrlData: string[] = [];

  // Combined data for modal display
  combinedFileData: { shortUrl: string; redirectUrl: string }[] = [];

  // Validation flags
  isShortUrlInvalid: boolean = false;
  isRedirectUrlInvalid: boolean = false;
  isShortUrlFileInvalid: boolean = false;
  isRedirectUrlFileInvalid: boolean = false;

  // Modal visibility
  showFilesModal: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;

  // Getter for total pages
  get totalPages(): number {
    return Math.ceil(this.combinedFileData.length / this.pageSize);
  }

  // Getter for paged data
  get pagedCombinedFileData(): { shortUrl: string; redirectUrl: string }[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.combinedFileData.slice(start, start + this.pageSize);
  }

  // Handle mode change: reset all data and validation
  onModeChange() {
    this.shortUrlData = [];
    this.redirectUrlData = [];
    this.combinedFileData = [];
    this.selectedShortUrl = '';
    this.selectedRedirectUrl = '';
    this.quantity = 1;
    this.redirectUrls = [];
    this.aliasIds = [];
    this.isShortUrlInvalid = false;
    this.isRedirectUrlInvalid = false;
    this.isShortUrlFileInvalid = false;
    this.isRedirectUrlFileInvalid = false;
    this.showFilesModal = false;
    this.currentPage = 1;
  }

  // Handle function type change: reset all data and validation
  onFunctionTypeChange() {
    this.shortUrlData = [];
    this.redirectUrlData = [];
    this.combinedFileData = [];
    this.selectedShortUrl = '';
    this.selectedRedirectUrl = '';
    this.quantity = 1;
    this.redirectUrls = [];
    this.aliasIds = [];
    this.isShortUrlInvalid = false;
    this.isRedirectUrlInvalid = false;
    this.isShortUrlFileInvalid = false;
    this.isRedirectUrlFileInvalid = false;
    this.showFilesModal = false;
    this.currentPage = 1;
  }

  // Handle quantity change: generate aliasIds and initialize empty redirectUrls
  onQuantityChange() {
    if (this.quantity > 0) {
      this.aliasIds = [];
      this.redirectUrls = [];
      for (let i = 0; i < this.quantity; i++) {
        this.aliasIds.push(this.generateAliasId());
        this.redirectUrls.push('');
      }
    } else {
      this.aliasIds = [];
      this.redirectUrls = [];
    }
  }

  // Generate a random aliasId (8 characters alphanumeric: numbers + lowercase letters)
  private generateAliasId(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Handle short URL file change
  onShortUrlFileChange(event: any) {
    this.handleFile(event, 'short');
  }

  // Handle redirect URL file change
  onRedirectUrlFileChange(event: any) {
    this.handleFile(event, 'redirect');
  }

  // Private method to handle file upload and validation
  private handleFile(event: any, type: 'short' | 'redirect'): Promise<void> {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      if (!file) {
        resolve();
        return;
      }

      // Validate file format: only .csv or .xlsx
      const allowedExtensions = ['.csv', '.xlsx'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      if (!allowedExtensions.includes(fileExtension)) {
        if (type === 'short') {
          this.isShortUrlFileInvalid = true;
        } else {
          this.isRedirectUrlFileInvalid = true;
        }
        alert('Invalid file format. Please select a .csv or .xlsx file.');
        resolve();
        return;
      }

      // Reset invalid flag
      if (type === 'short') {
        this.isShortUrlFileInvalid = false;
      } else {
        this.isRedirectUrlFileInvalid = false;
      }

      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          const data = <any[]>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

          const cleanedData = data.slice(1).map(row => row[0]).filter(Boolean);

          if (type === 'short') {
            this.shortUrlData = cleanedData;
          } else {
            this.redirectUrlData = cleanedData;
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsBinaryString(file);
    });
  }

  // Handle save button click: validate and show modal
  onSave() {
    // Reset validation flags
    this.isShortUrlInvalid = false;
    this.isRedirectUrlInvalid = false;
    this.isShortUrlFileInvalid = false;
    this.isRedirectUrlFileInvalid = false;

    if (this.selectedFunctionType === 'shortUrl') {
      if (this.selectedMode === 'manualEntry') {
        // Validate manual entry: check if textareas are not empty
        const shortLines = this.selectedShortUrl.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const redirectLines = this.selectedRedirectUrl.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

        if (shortLines.length === 0) {
          this.isShortUrlInvalid = true;
        }
        if (redirectLines.length === 0) {
          this.isRedirectUrlInvalid = true;
        }
        if (this.isShortUrlInvalid || this.isRedirectUrlInvalid) {
          return; // Do not proceed if invalid
        }

        // Combine data
        const maxLength = Math.max(shortLines.length, redirectLines.length);
        this.combinedFileData = [];
        for (let i = 0; i < maxLength; i++) {
          this.combinedFileData.push({
            shortUrl: shortLines[i] || '',
            redirectUrl: redirectLines[i] || '',
          });
        }
      } else if (this.selectedMode === 'fileUpload') {
        // Validate file upload: check if files are selected
        if (this.shortUrlData.length === 0) {
          this.isShortUrlFileInvalid = true;
        }
        if (this.redirectUrlData.length === 0) {
          this.isRedirectUrlFileInvalid = true;
        }
        if (this.isShortUrlFileInvalid || this.isRedirectUrlFileInvalid) {
          return; // Do not proceed if invalid
        }

        // Combine data
        const maxLength = Math.max(this.shortUrlData.length, this.redirectUrlData.length);
        this.combinedFileData = [];
        for (let i = 0; i < maxLength; i++) {
          this.combinedFileData.push({
            shortUrl: this.shortUrlData[i] || '',
            redirectUrl: this.redirectUrlData[i] || '',
          });
        }
      }
    } else if (this.selectedFunctionType === 'redirectUrl') {
      if (this.selectedMode === 'manualEntry') {
        // Validate quantity
        if (this.quantity <= 0) {
          alert('Quantity must be a positive integer.');
          return;
        }
        // Validate redirect URLs
        const redirectLines = this.selectedRedirectUrl.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
        if (redirectLines.length === 0) {
          this.isRedirectUrlInvalid = true;
          return;
        }
        const invalidUrls = redirectLines.filter(url => !this.isValidUrl(url));
        if (invalidUrls.length > 0) {
          this.isRedirectUrlInvalid = true;
          alert('All Redirect URLs must be valid.');
          return;
        }

        // Combine data with generated aliasIds and redirectUrls
        this.combinedFileData = [];
        for (let i = 0; i < this.quantity; i++) {
          this.combinedFileData.push({
            shortUrl: this.aliasIds[i] || '',
            redirectUrl: redirectLines[i] || '',
          });
        }
      } else if (this.selectedMode === 'fileUpload') {
        // Validate quantity matches file rows
        if (this.quantity <= 0) {
          alert('Quantity must be a positive integer.');
          return;
        }
        // if (this.redirectUrlData.length !== this.quantity) {
        //   alert('Quantity must match the number of rows in the uploaded file.');
        //   return;
        // }
        const invalidUrls = this.redirectUrlData.filter(url => !this.isValidUrl(url));
        if (invalidUrls.length > 0) {
          this.isRedirectUrlFileInvalid = true;
          alert('All URLs in the file must be valid.');
          return;
        }

        // Generate aliasIds and combine data
        this.aliasIds = [];
        for (let i = 0; i < this.quantity; i++) {
          this.aliasIds.push(this.generateAliasId());
        }
        this.combinedFileData = [];
        for (let i = 0; i < this.quantity; i++) {
          this.combinedFileData.push({
            shortUrl: this.aliasIds[i],
            redirectUrl: this.redirectUrlData[i],
          });
        }
      }
    }

    this.currentPage = 1; // Reset to first page
    this.showFilesModal = true; // Show popup
  }

  // Validate URL
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Close modal
  closeFilesModal() {
    this.showFilesModal = false;
  }

  // Pagination: previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Pagination: next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Export data to Excel
  exportData() {
    const isShortUrl = this.selectedFunctionType === 'shortUrl';
    const dataToExport = this.combinedFileData.map((item, index) => ({
      Sno: index + 1,
      [isShortUrl ? 'Short URL' : 'Alias ID']: item.shortUrl,
      'Redirect URL': item.redirectUrl,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isShortUrl ? 'Short URLs' : 'Redirect URLs');
    XLSX.writeFile(wb, isShortUrl ? 'short_urls.xlsx' : 'redirect_urls.xlsx');
  }
}
