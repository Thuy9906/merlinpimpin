import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { ChildAreaDashboardComponent } from './views/child-area-dashboard/child-area-dashboard.component';
import { ChildAreaComponent } from './views/child-area-dashboard/child-area/child-area.component';
import { FirstNamesComponent } from './views/child-area-dashboard/child-area/first-names/first-names.component';
import { BirthListComponent } from './views/child-area-dashboard/child-area/birth-list/birth-list.component';
import { FirstNamesFormComponent } from './views/child-area-dashboard/child-area/first-names-form/first-names-form.component';
import { BirthListFormComponent } from './views/child-area-dashboard/child-area/birth-list/gift-form/birth-list-form.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SearchbarComponent } from './common/searchbar/searchbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { BirthListService } from './services/birth-list.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FirstNamesService } from './services/first-names.service';
import { ChildAreaDashboardService } from './services/child-area-dashboard.service';
import { ChildAreaService } from './services/child-area.service';
import { UserService } from './services/user.service';
import { ChildAreaFormComponent } from './views/child-area-dashboard/child-area-form/child-area-form.component';
import { RouterModule, Routes } from '@angular/router';
import { GiftComponent } from './views/child-area-dashboard/child-area/birth-list/gift/gift.component';
import { LoaderComponent } from './common/loader/loader.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'child-dashboard', canActivate: [AuthGuardService], component: ChildAreaDashboardComponent },
  { path: 'child-dashboard/new', canActivate: [AuthGuardService], component: ChildAreaFormComponent },
  { path: 'child-dashboard/view/:id', canActivate: [AuthGuardService], component: ChildAreaComponent },
  { path: 'child-dashboard/view/:id/birth-list', canActivate: [AuthGuardService], component: BirthListComponent },
  { path: 'child-dashboard/view/:id/first-name', canActivate: [AuthGuardService], component: FirstNamesComponent },
  { path: 'child-dashboard/view/:id/birth-list/new-gift', canActivate: [AuthGuardService], component: BirthListFormComponent },
  { path: 'child-dashboard/view/:id/first-names/new-first-name', canActivate: [AuthGuardService], component: FirstNamesFormComponent },  
  { path: '', redirectTo: 'child-dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'child-dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ChildAreaDashboardComponent,
    ChildAreaComponent,
    FirstNamesComponent,
    BirthListComponent,
    FirstNamesFormComponent,
    BirthListFormComponent,
    NavbarComponent,
    SearchbarComponent,
    ChildAreaFormComponent,
    GiftComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, BirthListService, AuthGuardService, FirstNamesService, ChildAreaDashboardService, ChildAreaService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
