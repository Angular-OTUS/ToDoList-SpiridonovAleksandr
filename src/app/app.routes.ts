import { Routes } from '@angular/router';
import { ToDoList } from './components/modules/to-do-list/to-do-list';
import {
  NoDescriptionItemView,
} from './components/modules/to-do-item-view/no-description-item-view/no-description-item-view';
import { ToDoItemView } from './components/modules/to-do-item-view/to-do-item-view';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: ToDoList,
    children: [
      {
        path: '',
        component: NoDescriptionItemView,
      },
      {
        path: ':id',
        component: ToDoItemView,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/tasks',
  },
];
