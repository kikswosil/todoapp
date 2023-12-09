import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LogoutComponent } from './logout/logout.component';
import { EditorComponent } from './editor/editor.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Todoapp home.',
  },
  {
    path: 'app',
    component: MainComponent,
    title: 'Todo app'
  },
  {
    path: 'logout',
    component: LogoutComponent,
    title: 'logging out.'
  },
  {
    path: 'app/edit/',
    component: EditorComponent,
    title: 'edit todo'
  },
  {
    path: 'app/edit/:id',
    component: EditorComponent,
    title: 'edit todo'
  }
];
