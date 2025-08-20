// // src/app/service/loading-service.ts
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoadingService {
//   private loading = new BehaviorSubject<boolean>(true);
//   loading$ = this.loading.asObservable();

//   show() {
//     this.loading.next(true);
//   }

//   hide() {
//     this.loading.next(false);
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable() // Remove { providedIn: 'root' }
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}