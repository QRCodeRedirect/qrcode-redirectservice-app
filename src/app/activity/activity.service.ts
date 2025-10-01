import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ActivityStats {
  uploaded: number;
  deleted: number;
  userName: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  getActivityStats(): Observable<ActivityStats> {
    // Simulate an API call with a delay
    const mockStats: ActivityStats = {
      uploaded: 1234, // Hardcoded value for uploaded records
      deleted: 56,   // Hardcoded value for deleted records
      userName: 'admin', // Hardcoded user name
      date: new Date().toLocaleDateString(), // today's date (sysdate)
    };
    return of(mockStats).pipe(delay(1000));
  }
}