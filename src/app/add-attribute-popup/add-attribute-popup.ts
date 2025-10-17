import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SharedDataService } from '../Services/SharedDataService/shared-data-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-attribute-popup',
  imports: [MatDialogModule,CommonModule,FormsModule,
     MatFormFieldModule, MatInputModule, MatSelectModule,
     MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './add-attribute-popup.html',
  styleUrl: './add-attribute-popup.scss'
})

export class AddAttributePopup implements OnInit {
   displayedColumns: string[] = [
  'ID',
  'Alias ID',
  'Date',
  'App URL',
  'Image URL',
  'Category',
  'Created By',
  'Created Date',
  'Modified By', // This was missing
  'Modified Date' // This was missing
];
 selectedItem: string | null = null; // For single selection
  selectedItems: string[] = []; // For multiple selection
  private subscription!: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    public dialogRef: MatDialogRef<AddAttributePopup>,
    private sharedDataService: SharedDataService, private router: Router
  ) {
    //  this.displayedColumns=data;
    // console.log(this.displayedColumns);
  }
  ngOnInit(): void {
     this.subscription = this.sharedDataService.currentConfirmedArray.subscribe(
      (array) => {
        this.selectedItems = array;
      }
    );
    // // Initialize selectedItems if data is provided
    // if (this.data && Array.isArray(this.data)) {
    //   // Optionally pre-select items if needed
    //   this.selectedItems = [];
    // }
  }
// Method to handle single item selection
  onSelectItem(item: string): void {
    this.selectedItem = item;
  }

  // Method to handle multiple item selection (e.g., with checkboxes)
  onToggleItem(item: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
    console.log(this.selectedItems);
  }
   onConfirm() {
    this.sharedDataService.sendConfirmedArray(this.selectedItems);   
  }
  
    

}
