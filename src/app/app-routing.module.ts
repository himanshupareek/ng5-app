import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TargetComponent } from './target/target.component';
import { TargetEditComponent } from './target/target-edit/target-edit.component';
import { TargetDetailComponent } from './target/target-detail/target-detail.component';
import { TargetHomeComponent } from './target/target-home/target-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/target', pathMatch: 'full' },
  { path: 'target', component: TargetComponent, children: [
      { path: 'newTarget', component: TargetEditComponent },
      {path : ':id', component : TargetDetailComponent},
      { path : ':id/edit', component : TargetEditComponent },
      { path : '', component : TargetHomeComponent }
  ] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
