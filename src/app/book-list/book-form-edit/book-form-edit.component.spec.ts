import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormEditComponent } from './book-form-edit.component';

describe('BookFormEditComponent', () => {
  let component: BookFormEditComponent;
  let fixture: ComponentFixture<BookFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
