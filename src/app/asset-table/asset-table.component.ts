import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AssetRecord } from '../models/asset-record.model';

@Component({
  selector: 'app-asset-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss']
})
export class AssetTableComponent implements OnChanges, AfterViewInit {
  @Input() data: AssetRecord[] = [];

  displayedColumns: string[] = [
    'id', 'aliasId', 'date', 'appUrl', 'imageUrl', 'category', 'CreatedBy', 'CreatedDate', 'ModifiedBy', 'ModifiedDate'
  ];

  dataSource = new MatTableDataSource<AssetRecord>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(): void {
    this.dataSource.data = this.data || [];
    if (this.paginator) this.paginator.firstPage();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
