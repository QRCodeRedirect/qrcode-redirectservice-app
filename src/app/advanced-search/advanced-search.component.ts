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
import { AssetTableComponent } from '../asset-table/asset-table.component';

import { AssetRecord } from '../dashboard/dashboard.component';

type Criteria = 'equals' | 'contains' | 'startsWith' | 'endsWith';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, AssetTableComponent],
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  @Output() search = new EventEmitter<AssetRecord[]>();
  @Input() source: AssetRecord[] = [];

  // default dataset loaded when the page opens
  defaultSource: AssetRecord[] = [
    { id: 1, aliasId: 'A1001', date: '2023-10-01', appUrl: 'https://app.com/A1001', imageUrl: 'https://img.com/A1001', category: 'Dishmachine', CreatedBy: 'admin', CreatedDate: '2023-09-01', ModifiedBy: 'user1', ModifiedDate: '2023-09-15' },
    { id: 2, aliasId: 'A1002', date: '2023-10-02', appUrl: 'https://app.com/A1002', imageUrl: 'https://img.com/A1002', category: 'Laundry', CreatedBy: 'user2', CreatedDate: '2023-09-02', ModifiedBy: 'admin', ModifiedDate: '2023-09-16' },
    { id: 3, aliasId: 'A1003', date: '2023-10-03', appUrl: 'https://app.com/A1003', imageUrl: 'https://img.com/A1003', category: 'Sanitizer', CreatedBy: 'admin', CreatedDate: '2023-09-03', ModifiedBy: 'user3', ModifiedDate: '2023-09-17' },
    { id: 4, aliasId: 'A1004', date: '2023-10-04', appUrl: 'https://app.com/A1004', imageUrl: 'https://img.com/A1004', category: 'Detergent', CreatedBy: 'user4', CreatedDate: '2023-09-04', ModifiedBy: 'admin', ModifiedDate: '2023-09-18' },
    { id: 5, aliasId: 'A1005', date: '2023-10-05', appUrl: 'https://app.com/A1005', imageUrl: 'https://img.com/A1005', category: 'Dishmachine', CreatedBy: 'admin', CreatedDate: '2023-09-05', ModifiedBy: 'user5', ModifiedDate: '2023-09-19' },
    { id: 6, aliasId: 'A1006', date: '2023-10-06', appUrl: 'https://app.com/A1006', imageUrl: 'https://img.com/A1006', category: 'Laundry', CreatedBy: 'user6', CreatedDate: '2023-09-06', ModifiedBy: 'admin', ModifiedDate: '2023-09-20' },
    { id: 7, aliasId: 'A1007', date: '2023-10-07', appUrl: 'https://app.com/A1007', imageUrl: 'https://img.com/A1007', category: 'Sanitizer', CreatedBy: 'admin', CreatedDate: '2023-09-07', ModifiedBy: 'user7', ModifiedDate: '2023-09-21' },
    { id: 8, aliasId: 'A1008', date: '2023-10-08', appUrl: 'https://app.com/A1008', imageUrl: 'https://img.com/A1008', category: 'Detergent', CreatedBy: 'user8', CreatedDate: '2023-09-08', ModifiedBy: 'admin', ModifiedDate: '2023-09-22' },
    { id: 9, aliasId: 'A1009', date: '2023-10-09', appUrl: 'https://app.com/A1009', imageUrl: 'https://img.com/A1009', category: 'Dishmachine', CreatedBy: 'admin', CreatedDate: '2023-09-09', ModifiedBy: 'user9', ModifiedDate: '2023-09-23' },
    { id: 10, aliasId: 'A1010', date: '2023-10-10', appUrl: 'https://app.com/A1010', imageUrl: 'https://img.com/A1010', category: 'Laundry', CreatedBy: 'user10', CreatedDate: '2023-09-10', ModifiedBy: 'admin', ModifiedDate: '2023-09-24' },
    { id: 11, aliasId: 'A1011', date: '2023-10-11', appUrl: 'https://app.com/A1011', imageUrl: 'https://img.com/A1011', category: 'Sanitizer', CreatedBy: 'admin', CreatedDate: '2023-09-11', ModifiedBy: 'user11', ModifiedDate: '2023-09-25' },
    { id: 12, aliasId: 'A1012', date: '2023-10-12', appUrl: 'https://app.com/A1012', imageUrl: 'https://img.com/A1012', category: 'Detergent', CreatedBy: 'user12', CreatedDate: '2023-09-12', ModifiedBy: 'admin', ModifiedDate: '2023-09-26' },
    { id: 13, aliasId: 'A1013', date: '2023-10-13', appUrl: 'https://app.com/A1013', imageUrl: 'https://img.com/A1013', category: 'Dishmachine', CreatedBy: 'admin', CreatedDate: '2023-09-13', ModifiedBy: 'user13', ModifiedDate: '2023-09-27' },
    { id: 14, aliasId: 'A1014', date: '2023-10-14', appUrl: 'https://app.com/A1014', imageUrl: 'https://img.com/A1014', category: 'Laundry', CreatedBy: 'user14', CreatedDate: '2023-09-14', ModifiedBy: 'admin', ModifiedDate: '2023-09-28' },
    { id: 15, aliasId: 'A1015', date: '2023-10-15', appUrl: 'https://app.com/A1015', imageUrl: 'https://img.com/A1015', category: 'Sanitizer', CreatedBy: 'admin', CreatedDate: '2023-09-15', ModifiedBy: 'user15', ModifiedDate: '2023-09-29' },
    { id: 16, aliasId: 'A1016', date: '2023-10-16', appUrl: 'https://app.com/A1016', imageUrl: 'https://img.com/A1016', category: 'Detergent', CreatedBy: 'user16', CreatedDate: '2023-09-16', ModifiedBy: 'admin', ModifiedDate: '2023-09-30' },
    { id: 17, aliasId: 'A1017', date: '2023-10-17', appUrl: 'https://app.com/A1017', imageUrl: 'https://img.com/A1017', category: 'Dishmachine', CreatedBy: 'admin', CreatedDate: '2023-09-17', ModifiedBy: 'user17', ModifiedDate: '2023-10-01' },
    { id: 18, aliasId: 'A1018', date: '2023-10-18', appUrl: 'https://app.com/A1018', imageUrl: 'https://img.com/A1018', category: 'Laundry', CreatedBy: 'user18', CreatedDate: '2023-09-18', ModifiedBy: 'admin', ModifiedDate: '2023-10-02' },
    { id: 19, aliasId: 'A1019', date: '2023-10-19', appUrl: 'https://app.com/A1019', imageUrl: 'https://img.com/A1019', category: 'Sanitizer', CreatedBy: 'admin', CreatedDate: '2023-09-19', ModifiedBy: 'user19', ModifiedDate: '2023-10-03' },
    { id: 20, aliasId: 'A1020', date: '2023-10-20', appUrl: 'https://app.com/A1020', imageUrl: 'https://img.com/A1020', category: 'Detergent', CreatedBy: 'user20', CreatedDate: '2023-09-20', ModifiedBy: 'admin', ModifiedDate: '2023-10-04' }
  ];

  currentYear = new Date().getFullYear();
  lastResults: AssetRecord[] = [];

  attributes = [
    'id','aliasId','date','appUrl','imageUrl','category','CreatedBy','CreatedDate','ModifiedBy','ModifiedDate'
  ];

  criteriaOptions: { value: Criteria; label: string }[] = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rules: this.fb.array([
        this.fb.group({
          attribute: ['aliasId', Validators.required],
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
        attribute: ['aliasId', Validators.required],
        criteria: ['contains', Validators.required],
        value: ['', Validators.required]
      })
    );
  }

  removeRule(i: number) {
    if (this.rules.length > 1) this.rules.removeAt(i);
  }

  runSearch(source?: AssetRecord[]) {
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
    // run an initial search so results show on page load
    this.runSearch(this.defaultSource);
  }

}
