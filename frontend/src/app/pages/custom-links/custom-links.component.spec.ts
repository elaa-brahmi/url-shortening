import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLinksComponent } from './custom-links.component';

describe('CustomLinksComponent', () => {
  let component: CustomLinksComponent;
  let fixture: ComponentFixture<CustomLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLinksComponent]
    });
    fixture = TestBed.createComponent(CustomLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
