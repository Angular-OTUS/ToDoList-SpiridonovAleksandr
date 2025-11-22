import { Routes } from '@angular/router';
import {
  NoDescriptionItemView,
} from './components/modules/to-do-item-view/no-description-item-view/no-description-item-view';
import { ToDoItemView } from './components/modules/to-do-item-view/to-do-item-view';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'backlog',
    pathMatch: 'full',
  },
  {
    path: 'backlog',
    loadComponent: () =>
      import('./components/modules/backlog/backlog').then(m => m.Backlog),
    children: [
      {
        path: '',
        component: NoDescriptionItemView,
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: ToDoItemView,
      },
    ],
  },
  {
    path: 'board',
    loadComponent: () =>
      import('./components/modules/board/board').then(m => m.Board),
  },
  {
    path: '**',
    redirectTo: 'backlog',
  },
];
