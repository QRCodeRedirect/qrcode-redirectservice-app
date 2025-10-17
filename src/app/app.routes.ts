import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ActivityComponent } from './activity/activity.component';
import { CategoriesComponent } from './categories/categories.component';
import { Batch } from './batch/batch';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'activity', component: ActivityComponent },
  {path: 'batch', component: Batch},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Wildcard route for a 404 or redirect
];
