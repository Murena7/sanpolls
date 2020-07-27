import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarnNotificationService {
  warnDisplayed: Observable<boolean>;
  private displayed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  warnMessage: Observable<string>;
  private message: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    this.warnDisplayed = this.displayed.asObservable();
    this.warnMessage = this.message.asObservable();
  }

  show(message: string) {
    this.message.next(message);
    this.displayed.next(true);
  }

  hide() {
    this.displayed.next(false);
    this.message.next('');
  }
}
