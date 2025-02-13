import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEducationComponent } from './add-edit-education.component';

describe('EditEducationComponent', () => {
  let component: AddEditEducationComponent;
  let fixture: ComponentFixture<AddEditEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditEducationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
