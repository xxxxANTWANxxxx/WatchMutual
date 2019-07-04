import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserPage } from './display-user.page';

describe('DisplayUserPage', () => {
  let component: DisplayUserPage;
  let fixture: ComponentFixture<DisplayUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
