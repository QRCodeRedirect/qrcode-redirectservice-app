import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { AuthService } from '../create-batch/auth.service';
import { Batch, BatchService } from '../create-batch/batch.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatIconModule, MatTableModule, MatButtonModule, MatInputModule, MatMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchTerm = '';
  currentYear: number = new Date().getFullYear();
  userName: string | undefined;
  isAdmin = false;

  // Use an observable to hold the batch data
  batches$!: Observable<Batch[]>;

  // Define all the columns that should be displayed in the table.
  displayedColumns: string[] = ['batchName', 'description', 'urls', 'status', 'created', 'actions'];

  constructor(
    private authService: AuthService,
    private batchService: BatchService,
    private router: Router
  ) {}

  // Navigate to Advanced Search page. Optionally include a query param so advanced search can prefill.
  navigateToAdvancedSearch(query?: string) {
    const q = query || '';
    this.router.navigate(['/advanced-search'], { queryParams: { q } });
  }

  ngOnInit(): void {
    // Set user information from the AuthService
    this.userName = this.authService.currentUserValue?.name;
    this.isAdmin = this.authService.isAdmin();

    // Fetch batches based on user role
    this.batches$ = this.batchService.getBatches();
  }

  // The search functionality would need to be re-implemented to filter the observable stream if desired.
  // For now, we'll keep it simple.
  searchBatches() {}

  onDelete(batchId: string, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Call the service to delete the batch and then refresh the list
    this.batchService.deleteBatch(batchId).subscribe(() => {
      this.batches$ = this.batchService.getBatches();
    });
  }
}
