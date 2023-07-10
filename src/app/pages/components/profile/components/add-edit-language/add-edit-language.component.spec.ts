import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLanguageComponent } from './add-edit-language.component';

describe('AddEditLanguageComponent', () => {
  let component: AddEditLanguageComponent;
  let fixture: ComponentFixture<AddEditLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditLanguageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
