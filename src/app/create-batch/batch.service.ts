import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Batch {
  id: string;
  batchName: string;
  createdBy: string; // User ID
  description: string;
  urls: string;
  status: 'Complete' | 'Processing';
  created: string;
}

// MOCK DATA
const MOCK_BATCHES: Batch[] = [
  {
    id: '1',
    batchName: 'Test Campaign',
    createdBy: 'admin-id-001',
    description: '$10K for field deployment',
    urls: '10K',
    status: 'Complete',
    created: '2024-09-20T10:00:00Z',
  },
  {
    id: '2',
    batchName: 'Training Materials',
    createdBy: 'user-id-123',
    description: 'QR codes for training docs',
    urls: '500',
    status: 'Processing',
    created: '2024-10-07T11:30:00Z',
  },
  {
    id: '3',
    batchName: 'Equipment Tags',
    createdBy: 'admin-id-001',
    description: 'QR codes for equipment tracking',
    urls: '1K',
    status: 'Complete',
    created: '2024-09-01T09:00:00Z',
  },
  {
    id: '4',
    batchName: 'Conference Materials',
    createdBy: 'user-id-456',
    description: 'Annual conference attendee badges',
    urls: '850',
    status: 'Processing',
    created: '2024-08-30T14:00:00Z',
  },
  {
    id: '5',
    batchName: 'Test Batch',
    createdBy: 'user-id-123',
    description: 'Additional sample batch for pagination',
    urls: '100',
    status: 'Complete',
    created: '2024-09-25T16:45:00Z',
  },
];


@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private authService: AuthService) { }

  getBatches(): Observable<Batch[]> {
    const currentUser = this.authService.currentUserValue;

    return of(MOCK_BATCHES).pipe(
      map(batches => {
        if (this.authService.isAdmin()) {
          return batches; // Admin sees all batches
        }
        // Normal user sees only their own batches
        return batches.filter(batch => batch.createdBy === currentUser?.id);
      })
    );
  }

  deleteBatch(batchId: string): Observable<any> {
    // Mock deleting a batch. In a real app, this would be an HTTP call.
    console.log(`Deleting batch with ID: ${batchId}`);
    return of({ success: true });
  }
}