import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNewsComponent } from './last-news.component';

describe('LastNewsComponent', () => {
  let component: LastNewsComponent;
  let fixture: ComponentFixture<LastNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
