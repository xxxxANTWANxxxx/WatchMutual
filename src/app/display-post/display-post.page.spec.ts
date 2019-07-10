import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPostPage } from './display-post.page';

describe('DisplayPostPage', () => {
  let component: DisplayPostPage;
  let fixture: ComponentFixture<DisplayPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
