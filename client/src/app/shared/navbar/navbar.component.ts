import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { IUser, UserStatus } from '@core/entities/user/user.types';
import { Router } from '@angular/router';
import { UserRole } from '@core/entities/user/role.types';

@Component({
  selector: 'san-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userData: IUser;
  userStatus = UserStatus;
  role = UserRole;

  centered = false;
  disabled = false;
  unbounded = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.userData = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
