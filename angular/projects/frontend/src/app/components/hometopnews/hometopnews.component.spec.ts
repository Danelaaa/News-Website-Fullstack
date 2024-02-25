import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometopnewsComponent } from './hometopnews.component';

describe('HometopnewsComponent', () => {
  let component: HometopnewsComponent;
  let fixture: ComponentFixture<HometopnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HometopnewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HometopnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
