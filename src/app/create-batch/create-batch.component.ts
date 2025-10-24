import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.batchForm = this.fb.group({
      batchName: ['', [Validators.required]],
      description: [''],
      numberOfUrls: [1000, [Validators.required, Validators.min(1), Validators.max(5000)]],
      expirationDate: ['2029-12-12', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.batchForm.valid) {
      // Handle form submission
      console.log('Form submitted:', this.batchForm.value);
      // TODO: Implement actual submission logic
      this.router.navigate(['/batch']);
    } else {
      // Mark all fields as touched to show validation errors
      this.batchForm.markAllAsTouched();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
