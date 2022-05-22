import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToSignIn = () => redirectUnauthorizedTo(['signin']);

const routes: Routes = [
  {
    path: 'signin', component: SigninComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'signup', component: SignupComponent,
  },
  {
    path: '', component: HomeComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignIn }
  },
  {
    path: 'addpost', component: AddpostComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignIn }
  },
  {
    path: '**', component: PagenotfoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
