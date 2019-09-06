import { Routes } from '@angular/router';

import { UserManagementComponent } from './usermanagement.component';

export const UserManagementRoutes: Routes = [
  {
    path: 'admins',
    component: UserManagementComponent
  },
  {
    path: 'users',
    component: UserManagementComponent
  }
];
