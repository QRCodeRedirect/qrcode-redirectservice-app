import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AssetRecord } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-asset-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatCardModule, MatIconModule],
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss']
})
export class AssetTableComponent implements OnChanges, AfterViewInit {
  @Input() data: AssetRecord[] = [];

  displayedColumns: string[] = [
    'id', 'aliasId', 'date', 'appUrl', 'imageUrl', 'category', 'CreatedBy', 'CreatedDate', 'ModifiedBy', 'ModifiedDate'
  ];

  dataSource = new MatTableDataSource<AssetRecord>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(): void {
    this.dataSource.data = this.data || [];
    if (this.paginator) this.paginator.firstPage();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
