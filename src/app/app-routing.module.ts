import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditHoldReleaseComponent } from './credit-hold-release/credit-hold-release.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'credit-hold-release', component: CreditHoldReleaseComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
