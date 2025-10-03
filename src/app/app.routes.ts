import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ActivityComponent } from './activity/activity.component';
import { CategoryExplorerComponent } from './categories/category-explorer.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent },
  { path: 'categories', component: CategoryExplorerComponent },
  { path: 'activity', component: ActivityComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Wildcard route for a 404 or redirect
];
