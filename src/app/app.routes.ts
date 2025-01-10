import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

export const routes: Routes = [{
    path: "auth",
    component: AuthComponent,
    children: [{
        path: "signUp",
        component: SignUpComponent
    }]
}];
