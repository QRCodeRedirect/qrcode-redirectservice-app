import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddAttributePopup } from '../add-attribute-popup/add-attribute-popup';
 import { MatDialogModule } from '@angular/material/dialog';
 import { Subscription } from 'rxjs'; 
import { SharedDataService } from '../Services/SharedDataService/shared-data-service';
import { DragDropModule, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';

import { CommonModule } from '@angular/common';
interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-preferences-popup',
  imports: [MatDialogModule,FormsModule, MatFormFieldModule, MatInputModule,
     MatSelectModule,MatButtonModule, MatDividerModule, MatIconModule,DragDropModule,
     CommonModule,MatListModule],
  templateUrl: './preferences-popup.html',
  styleUrl: './preferences-popup.scss'
})
export class PreferencesPopup implements OnInit {
  displayedColumns: string[] = [];
  selectedType!: string;
  selectedView!: string;
  receivedArray: any[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.receivedArray, event.previousIndex, event.currentIndex);
  }
  onDropIntoTrash(event: CdkDragDrop<string[]>) {
        if (event.previousContainer.id !== 'trash-zone') { // Ensure it's not dropped from the trash itself
            // Remove the item from its original array
            event.previousContainer.data.splice(event.previousIndex, 1);
        }
    }
    removeItem(index: number) {
        this.receivedArray.splice(index, 1);
      }
  private subscription!: Subscription;
   types: Type[] = [
    {value: '', viewValue: ''},
    {value: 'Export/Import Template', viewValue: 'Export/Import Template'},
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {items: string[]},public dialogRef: MatDialog,private sharedDataService: SharedDataService) {
   
  this.displayedColumns=data.items;
  }
   ngOnInit(): void {
    this.subscription = this.sharedDataService.currentConfirmedArray.subscribe(
      (array) => {
        this.receivedArray = array;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); // Prevent memory leaks
  }
openList(): void {
      const dialog = this.dialogRef.open(AddAttributePopup, {
        data: { initialValue: 'some value' }
      });

      dialog.afterClosed().subscribe(result => {
        if (result) {
          console.log('Selected item:', result);
        }
      });
    }
    ClearAll(){
      this.receivedArray.length = 0;
    }
    onSave() {
    this.sharedDataService.sendConfirmedArray(this.receivedArray);  
     //this.dialogRef.close({ updatedValue: this.receivedArray }); 
  }
  
}
