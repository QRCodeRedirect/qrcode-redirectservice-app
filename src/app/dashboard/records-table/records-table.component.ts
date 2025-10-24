
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export interface Batch {
  name: string;
  description: string;
  shortUrl: string;
  imageUrl: string;
  created: string;
}

const BATCHES: Batch[] = [
  {
    name: 'Test Campaign',
    description: '$10K for field deployment',
    shortUrl: '10K',
    imageUrl: 'https://via.placeholder.com/50x50?text=QR',
    created: 'Sep 20'
  },
  {
    name: 'Training Materials',
    description: 'QR codes for training docs',
    shortUrl: '500',
    imageUrl: 'https://via.placeholder.com/50x50?text=QR',
    created: 'Oct 07'
  },
  {
    name: 'Equipment Tags',
    description: 'QR codes for equipment tracking',
    shortUrl: '1K',
    imageUrl: 'https://via.placeholder.com/50x50?text=QR',
    created: 'Sep 01'
  },
  {
    name: 'Conference Materials',
    description: 'Annual conference attendee badges',
    shortUrl: '850',
    imageUrl: 'https://via.placeholder.com/50x50?text=QR',
    created: 'Aug 30'
  },
  {
    name: 'Sample Batch',
    description: 'Additional sample batch for pagination',
    shortUrl: '100',
    imageUrl: 'https://via.placeholder.com/50x50?text=QR',
    created: 'Sep 25'
  }
];

@Component({
  selector: 'app-records-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.scss'],
})
export class RecordsTableComponent implements AfterViewInit, OnInit, OnChanges {
  displayedColumns: string[] = ['name', 'description', 'shortUrl', 'qrCode', 'created', 'actions'];
  dataSource = new MatTableDataSource<Batch>(BATCHES);
  isLoading = false;

  @Input() data: Batch[] = BATCHES;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
