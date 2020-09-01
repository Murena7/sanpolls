import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { IUser, UserStatus } from '@core/interfaces/user/user.types';
import { Router } from '@angular/router';
import { UserRole } from '@core/interfaces/user/role.types';
import { AuthApiService } from '@core/api-services/auth-api.service';

@Component({
  selector: 'san-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userData: IUser;
  userStatus = UserStatus;
  role = UserRole;

  centered = false;
  disabled = false;
  unbounded = false;

  constructor(private authService: AuthService, private authApiService: AuthApiService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.userData = user;
    });
  }

  logout() {
    this.authApiService.logout().subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }
}
