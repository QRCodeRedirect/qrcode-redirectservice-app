import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BatchService } from './batch.service';
import { BatchCreationRequest } from '../models/batch-creation-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-batch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss']
})
export class CreateBatchComponent {
  batchForm: FormGroup;
  activeTab: string = 'manual'; // 'manual' or 'csv'
  currentYear: number = new Date().getFullYear();
  userName = 'John Doe'; // Placeholder, can be from service

  constructor(private fb: FormBuilder, private router: Router, private batchService: BatchService, private authService: AuthService) {
    this.batchForm = this.fb.group({
      batchName: ['', [Validators.required]],
      description: [''],
      numberOfUrls: [1000, [Validators.required, Validators.min(1), Validators.max(5000)]],
      expirationDate: ['2029-12-12', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.batchForm.valid) {
      const userId = this.authService.getUserId();
      if (!userId) {
        alert('User not logged in. Please log in first.');
        return;
      }

      const request: BatchCreationRequest = {
        BatchName: this.batchForm.value.batchName,
        Description: this.batchForm.value.description,
        UrlCount: this.batchForm.value.numberOfUrls,
        ExpirationDate: new Date(this.batchForm.value.expirationDate),
        UserId: userId
      };

      this.batchService.createBatch(request).subscribe({
        next: (response) => {
          console.log('Batch created successfully:', response);
          alert('Batch created successfully!');
          this.router.navigate(['/batch']);
        },
        error: (error) => {
          console.error('Error creating batch:', error);
          alert('Error creating batch. Please try again.');
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.batchForm.markAllAsTouched();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
