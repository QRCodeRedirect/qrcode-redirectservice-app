import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch, BatchService } from './batch.service';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  batches$!: Observable<Batch[]>;
  isAdmin = false;

  constructor(
    private batchService: BatchService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.batches$ = this.batchService.getBatches();
    this.isAdmin = this.authService.isAdmin();
  }

  onDelete(batchId: string): void {
    // Add confirmation logic here if needed
    this.batchService.deleteBatch(batchId).subscribe(() => {
      this.batches$ = this.batchService.getBatches(); // Refresh list
    });
  }
}