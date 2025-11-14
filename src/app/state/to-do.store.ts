import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { removeEntity, setAllEntities, setEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { ToDo, ToDoDto } from '../model/to-do';
import { inject } from '@angular/core';
import { ToDoListApiService } from '../services/to-do-list.api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export const ToDoStore = signalStore(
  { providedIn: 'root' },
  withState({ isLoading: false }),
  withEntities<ToDo>(),
  withMethods((store, apiService = inject(ToDoListApiService)) => ({
    getAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return apiService.getAll().pipe(
            tapResponse({
              next: response => patchState(store, setAllEntities(response.items)),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false })
            })
          )
        })
      )
    ),

    add: rxMethod<ToDoDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(dto => {
          return apiService.add(dto).pipe(
            tapResponse({
              next: response => patchState(store, setEntity(response)),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false })
            })
          )
        })
      )
    ),

    update: rxMethod<ToDo>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(toDo => {
          return apiService.update(toDo).pipe(
            tapResponse({
              next: response => patchState(store, updateEntity({ id: toDo.id, changes: { ...response }})),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false })
            })
          )
        })
      )
    ),

    removeById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(id => {
          return apiService.removeById(id).pipe(
            tapResponse({
              next: () => patchState(store, removeEntity(id)),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false })
            })
          )
        })
      )
    ),
  }))
);
