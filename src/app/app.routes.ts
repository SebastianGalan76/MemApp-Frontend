import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

export const routes: Routes = [{
    path: "auth",
    component: AuthComponent,
    children: [
        {
            path: "",
            redirectTo: "signUp",
            pathMatch: "full"
        }, {
            path: "signUp",
            component: SignUpComponent
        },
        {
            path: "signIn",
            component: SignInComponent
        }, {
            path: 'active/:uuid',
            component: SignInComponent
        }, {
            path: 'resetPassword',
            component: ResetPasswordComponent
        }]
}];
