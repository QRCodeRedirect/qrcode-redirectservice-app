import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
   private confirmedArraySource = new BehaviorSubject<any[]>([]);
    currentConfirmedArray = this.confirmedArraySource.asObservable();
  
    constructor() {}
  
    sendConfirmedArray(array: any[]) {
      this.confirmedArraySource.next(array);
    }
}
