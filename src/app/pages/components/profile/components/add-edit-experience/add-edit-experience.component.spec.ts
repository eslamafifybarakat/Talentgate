import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExperienceComponent } from './add-edit-experience.component';

describe('EditExperienceComponent', () => {
  let component: AddEditExperienceComponent;
  let fixture: ComponentFixture<AddEditExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditExperienceComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
