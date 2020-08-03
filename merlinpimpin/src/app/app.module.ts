import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { ChildAreaDashboardComponent } from './views/child-area-dashboard/child-area-dashboard.component';
import { ChildAreaComponent } from './views/child-area-member/child-area.component';
import { FirstNamesComponent } from './views/first-names/first-names.component';
import { FirstNamesFormComponent } from './views/first-names-form/first-names-form.component';
import { GiftFormComponent } from './views/gift-form/gift-form.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SearchbarComponent } from './common/searchbar/searchbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FirstNamesService } from './services/first-names.service';
import { ChildAreaDashboardService } from './services/child-area-dashboard.service';
import { ChildAreaService } from './services/child-area.service';
import { UserService } from './services/user.service';
import { ChildAreaFormComponent } from './views/child-area-form/child-area-form.component';
import { RouterModule, Routes } from '@angular/router';
import { GiftComponent } from './views/gift/gift.component';

import { LoaderComponent } from './common/loader/loader.component';
import { CardComponent } from './common/card/card.component';
import { UserCardComponent } from './common/user-card/user-card.component';
import { ButtonComponent } from './common/button/button.component';
import { MiniatureComponent } from './common/miniature/miniature.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { InteractiveInputComponent } from './common/interactive-input/interactive-input.component';
import { ActiveImageComponent } from './common/active-image/active-image.component';
import { SquareIconComponent } from './common/square-icon/square-icon.component';
import { StringPickerComponent } from './common/string-picker/string-picker.component';
import { UserPickerComponent } from './common/user-picker/user-picker.component';
import { UploadService } from './services/upload.service';
import { BabyRegistryService } from './services/baby-registry.service';
import { BabyRegistryComponent } from './views/baby-registry/baby-registry.component';
import { ChildAreaAdminViewComponent } from './views/child-area-admin-view/child-area-admin-view.component';
import { BabyRegistryAdminComponent } from './views/baby-registry-admin/baby-registry-admin.component';
import { FirstNamesAdminComponent } from './views/first-names-admin/first-names-admin.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'child-area-dashboard', canActivate: [AuthGuardService], component: ChildAreaDashboardComponent },
  { path: 'child-area-dashboard/new', canActivate: [AuthGuardService], component: ChildAreaFormComponent },
  { path: 'child-area-dashboard/view/:id', canActivate: [AuthGuardService], component: ChildAreaComponent },
  { path: 'child-area-dashboard/manage/:id', canActivate: [AuthGuardService], component: ChildAreaAdminViewComponent },
  { path: 'child-area-dashboard/view/:id/baby-registry', canActivate: [AuthGuardService], component: BabyRegistryComponent },
  { path: 'child-area-dashboard/manage/:id/baby-registry', canActivate: [AuthGuardService], component: BabyRegistryAdminComponent },
  { path: 'child-area-dashboard/view/:id/first-names', canActivate: [AuthGuardService], component: FirstNamesComponent },
  { path: 'child-area-dashboard/manage/:id/first-names', canActivate: [AuthGuardService], component: FirstNamesAdminComponent },
  { path: 'child-area-dashboard/manage/:id/baby-registry/new-gift', canActivate: [AuthGuardService], component: GiftFormComponent },
  { path: 'child-area-dashboard/manage/:id/first-names/new-first-name', canActivate: [AuthGuardService], component: FirstNamesFormComponent },  
  { path: '', redirectTo: 'child-area-dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'child-area-dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ChildAreaDashboardComponent,
    ChildAreaComponent,
    FirstNamesComponent,
    BabyRegistryComponent,
    FirstNamesFormComponent,
    GiftFormComponent,
    NavbarComponent,
    SearchbarComponent,
    ChildAreaFormComponent,
    GiftComponent,
    LoaderComponent,
    CardComponent,
    UserCardComponent,
    ButtonComponent,
    MiniatureComponent,
    SpinnerComponent,
    InteractiveInputComponent,
    ActiveImageComponent,
    SquareIconComponent,
    StringPickerComponent,
    UserPickerComponent,
    ChildAreaAdminViewComponent,
    BabyRegistryAdminComponent,
    FirstNamesAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UploadService, AuthService, BabyRegistryService, AuthGuardService, FirstNamesService, 
              ChildAreaDashboardService, ChildAreaService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
