import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { IUser } from '../../../core/entities/user/user.types';

@Component({
  selector: 'san-my-voices',
  templateUrl: './my-voices.component.html',
  styleUrls: ['./my-voices.component.scss'],
})
export class MyVoicesComponent implements OnInit {
  userData: IUser;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authService.currentUserValue;
  }
}
