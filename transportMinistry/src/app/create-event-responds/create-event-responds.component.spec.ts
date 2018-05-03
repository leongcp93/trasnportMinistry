import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventRespondsComponent } from './create-event-responds.component';

describe('CreateEventRespondsComponent', () => {
  let component: CreateEventRespondsComponent;
  let fixture: ComponentFixture<CreateEventRespondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventRespondsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventRespondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
