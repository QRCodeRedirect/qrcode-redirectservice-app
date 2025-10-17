import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
 import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { ClipboardModule } from '@angular/cdk/clipboard';
 import { MatDatepickerModule } from '@angular/material/datepicker';
    import { MatInputModule } from '@angular/material/input';
    import { MatNativeDateModule } from '@angular/material/core'; // For native date adapter
    import{MatFormFieldModule} from '@angular/material/form-field';
 import { FormsModule } from '@angular/forms';
export interface PeriodicElement {
  shortUrl: string;
  destinastionUrl: string;
  qr: number;
  click: number;
  status: string;
  expiryDate: Date;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {shortUrl:'https://dev.ecl.inc/u3v4w5x6', destinastionUrl:'https://vast.ecolab.com/u3v4w5x6', qr: 5, click: 230, status:'Active', expiryDate:new Date('2024-12-31')},
{shortUrl:'https://dev.ecl.inc/a1b2c3d4', destinastionUrl:'https://vast.ecolab.com/a1b2c3d4', qr: 3, click: 150, status:'Inactive', expiryDate:new Date('2023-11-30')},
{shortUrl:'https://dev.ecl.inc/e5f6g7h8', destinastionUrl:'https://vast.ecolab.com/e5f6g7h8', qr: 8, click: 320, status:'Active', expiryDate:new Date('2025-01-15')},
{shortUrl:'https://dev.ecl.inc/i9j0k1l2', destinastionUrl:'https://vast.ecolab.com/i9j0k1l2', qr: 2, click: 90, status:'Active', expiryDate:new Date('2024-10-20')},
{shortUrl:'https://dev.ecl.inc/m3n4o5p6', destinastionUrl:'https://vast.ecolab.com/m3n4o5p6', qr: 6, click: 210, status:'Inactive', expiryDate:new Date('2023-12-05')},
];
@Component({
  selector: 'app-batch',
  imports: [MatCardModule, MatIconModule,MatTableModule,ClipboardModule,MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,MatFormFieldModule,FormsModule],
  templateUrl: './batch.html',
  styleUrl: './batch.scss'
})
export class Batch {
displayedColumns: string[] = ['shortUrl', 'destinastionUrl', 'qr', 'click', 'status', 'expiryDate'];
  dataSource = ELEMENT_DATA;
}
