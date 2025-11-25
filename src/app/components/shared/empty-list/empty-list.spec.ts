import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyList } from './empty-list';

describe('EmptyList', () => {
  let component: EmptyList;
  let fixture: ComponentFixture<EmptyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyList],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
