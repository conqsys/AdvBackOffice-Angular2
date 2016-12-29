import { RouterModule, Routes } from '@angular/router';
import { MyPageComponent } from './mypage.component';
import {DepartmentDetailComponent} from './department/department-detail.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/department', pathMatch: 'full' },
  { path: 'mypage', component: MyPageComponent },
  { path: 'department', component: DepartmentDetailComponent },
];
export const routing = RouterModule.forRoot(APP_ROUTES);
