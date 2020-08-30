import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';

export interface WindowSize {
  height: number;
  width: number;
}

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  constructor(@Inject('windowObject') private window: Window) {
    fromEvent(window, 'resize')
      .pipe(
        auditTime(100),
        map(
          event =>
            <WindowSize>{
              // @ts-ignore
              width: event['currentTarget'].innerWidth,
              // @ts-ignore
              height: event['currentTarget'].innerHeight
            }
        )
      )
      .subscribe(windowSize => {
        this.windowSizeChanged.next(windowSize);
      });
  }

  readonly windowSizeChanged = new BehaviorSubject<WindowSize>(<WindowSize>{
    width: this.window.innerWidth,
    height: this.window.innerHeight
  });
}
