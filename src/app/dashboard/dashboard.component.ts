import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatIconModule, MatTableModule, MatButtonModule, MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  searchTerm = '';
  currentYear: number = new Date().getFullYear();
  userName = 'John Doe';
  batches = [
    {
      name: 'Test Campaign',
      description: '$10K for field deployment',
      urls: '10K',
      status: 'Complete',
      created: 'Sep 20'
    },
    {
      name: 'Training Materials',
      description: 'QR codes for training docs',
      urls: '500',
      status: 'Processing',
      created: 'Oct 07'
    },
    {
      name: 'Equipment Tags',
      description: 'QR codes for equipment tracking',
      urls: '1K',
      status: 'Complete',
      created: 'Sep 01'
    },
    {
      name: 'Conference Materials',
      description: 'Annual conference attendee badges',
      urls: '850',
      status: 'Complete',
      created: 'Aug 30'
    },
    {
      name: 'Sample Batch',
      description: 'Additional sample batch for pagination',
      urls: '100',
      status: 'Complete',
      created: 'Sep 25'
    }
  ];

  displayedColumns: string[] = ['name', 'description', 'urls', 'status', 'created', 'actions'];

  get dataSource() {
    return this.filteredBatches();
  }

  filteredBatches() {
    if (!this.searchTerm) {
      return this.batches;
    }
    return this.batches.filter(batch =>
      batch.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  searchBatches() {
    // You can keep the filtering inside the filteredBatches method (for instant search), so this could be empty
  }

}
