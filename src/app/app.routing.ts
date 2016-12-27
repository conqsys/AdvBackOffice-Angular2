import { RouterModule, Routes } from "@angular/router";
import { MyPageComponent } from "./mypage.component";
	
const APP_ROUTES: Routes = [
	{ path: 'mypage', component: MyPageComponent },
];
export const routing = RouterModule.forRoot(APP_ROUTES);
