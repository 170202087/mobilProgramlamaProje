import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AracyonetimPage } from './aracyonetim.page';

describe('AracyonetimPage', () => {
  let component: AracyonetimPage;
  let fixture: ComponentFixture<AracyonetimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracyonetimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracyonetimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
