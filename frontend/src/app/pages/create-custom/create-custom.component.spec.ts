import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomComponent } from './create-custom.component';

describe('CreateCustomComponent', () => {
  let component: CreateCustomComponent;
  let fixture: ComponentFixture<CreateCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCustomComponent]
    });
    fixture = TestBed.createComponent(CreateCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
