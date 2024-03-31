import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenViewComponent } from './token-view/token-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'table', component: TokenViewComponent },
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
