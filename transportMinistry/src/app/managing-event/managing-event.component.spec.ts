import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingEventComponent } from './managing-event.component';

describe('ManagingEventComponent', () => {
  let component: ManagingEventComponent;
  let fixture: ComponentFixture<ManagingEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagingEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
