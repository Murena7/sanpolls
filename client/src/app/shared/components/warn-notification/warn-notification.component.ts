import { Component, OnInit } from '@angular/core';
import { WarnNotificationService } from '@core/common-services/warn-notification.service';

@Component({
  selector: 'san-warn-notification',
  templateUrl: './warn-notification.component.html',
  styleUrls: ['./warn-notification.component.scss']
})
export class WarnNotificationComponent implements OnInit {
  constructor(public warnNotificationService: WarnNotificationService) {}

  ngOnInit(): void {}
}
