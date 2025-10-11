import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDescriptionItemView } from './no-description-item-view';

describe('NoDescriptionItemView', () => {
  let component: NoDescriptionItemView;
  let fixture: ComponentFixture<NoDescriptionItemView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDescriptionItemView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDescriptionItemView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
