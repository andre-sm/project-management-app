import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HandleViewService {
  screenSize$: BehaviorSubject<number> = new BehaviorSubject(0);
}
