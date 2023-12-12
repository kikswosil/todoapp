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
    children: [
      {
        path: '',
        component: MainComponent,
        title: 'todo app'
      },
      {
        path: 'edit/',
        component: EditorComponent,
        title: 'create a todo'
      },
      {
        path: 'edit/:id',
        component: EditorComponent,
        title: 'edit a todo'
      }
    ]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    title: 'logging out.'
  },
];
