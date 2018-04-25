import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeopleRespondsComponent } from './add-people-responds.component';

describe('AddPeopleRespondsComponent', () => {
  let component: AddPeopleRespondsComponent;
  let fixture: ComponentFixture<AddPeopleRespondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPeopleRespondsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeopleRespondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
