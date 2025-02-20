import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ActiveAccountComponent } from './auth/active-account/active-account.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { CreatePostComponent } from './main/create-post/create-post.component';
import { PostPageComponent } from './main/post/post.component';

export const routes: Routes = [
    {
        path: "auth",
        component: AuthComponent,
        children: [{
            path: "",
            redirectTo: "signUp",
            pathMatch: "full"
        }, {
            path: "signUp",
            component: SignUpComponent
        }, {
            path: "signIn",
            component: SignInComponent
        }, {
            path: 'resetPassword',
            component: ResetPasswordComponent
        }, {
            path: 'activeAccount',
            component: ActiveAccountComponent
        }, {
            path: 'active/:uuid',
            component: SignInComponent
        }, {
            path: 'changePassword',
            component: ChangePasswordComponent
        }]
    }, {
        path: "",
        component: MainComponent,
        children: [{
            path: "post/:id",
            component: PostPageComponent
        }, {
            path: "create",
            component: CreatePostComponent
        }, {
            path: "",
            component: HomeComponent
        }]
    }
];

