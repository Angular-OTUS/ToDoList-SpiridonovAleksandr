import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFilter } from './to-do-filter';

describe('ToDoFilter', () => {
  let component: ToDoFilter;
  let fixture: ComponentFixture<ToDoFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
