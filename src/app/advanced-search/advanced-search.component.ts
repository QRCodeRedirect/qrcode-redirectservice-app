import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecordsTableComponent, Batch } from '../dashboard/records-table/records-table.component';
import { AuthService } from '../create-batch/auth.service';

type Criteria = 'equals' | 'contains' | 'startsWith' | 'endsWith';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, RecordsTableComponent],
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  @Output() search = new EventEmitter<Batch[]>();
  @Input() source: Batch[] = [];

  userName: string = 'John Doe'; // Replace with actual user name logic

  // default dataset loaded when the page opens
  defaultSource: Batch[] = [
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

  currentYear = new Date().getFullYear();
  lastResults: Batch[] = [];
  displayedColumns: string[] = ['name', 'description', 'shortUrl', 'created', 'actions'];

  attributes = [
    'name', 'description', 'shortUrl', 'created'
  ];

  criteriaOptions: { value: Criteria; label: string }[] = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      rules: this.fb.array([
        this.fb.group({
          attribute: ['name', Validators.required],
          criteria: ['contains', Validators.required],
          value: ['', Validators.required]
        })
      ])
    });
  }

  get rules(): FormArray {
    return this.form.get('rules') as FormArray;
  }

  addRule() {
    this.rules.push(
      this.fb.group({
        attribute: ['name', Validators.required],
        criteria: ['contains', Validators.required],
        value: ['', Validators.required]
      })
    );
  }

  removeRule(i: number) {
    if (this.rules.length > 1) this.rules.removeAt(i);
  }

  runSearch(source?: Batch[]) {
    if (!source) source = (this.source && this.source.length) ? this.source : this.defaultSource;
    const rules = this.form.value.rules || [];
    const results = source.filter(item => {
      // All rules must match (AND). Could be adapted to OR later.
      return rules.every((r: any) => {
        const attr = r.attribute;
        const crit: Criteria = r.criteria;
        const raw = (item as any)[attr];
        const val = (r.value || '').toString().toLowerCase();
        const target = raw == null ? '' : raw.toString().toLowerCase();

        switch (crit) {
          case 'equals':
            return target === val;
          case 'contains':
            return target.includes(val);
          case 'startsWith':
            return target.startsWith(val);
          case 'endsWith':
            return target.endsWith(val);
        }
      });
    });

    this.search.emit(results);
    this.lastResults = results;
  }

  ngOnInit(): void {
    // Set user information from the AuthService
    this.userName = this.authService.currentUserValue?.name || 'John Doe';
    // run an initial search so results show on page load
    this.runSearch(this.defaultSource);
  }

}
