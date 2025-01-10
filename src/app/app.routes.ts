import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

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
        }]
}];
