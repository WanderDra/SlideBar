import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideBarDemoComponent } from './slide-bar-demo.component';

describe('SlideBarDemoComponent', () => {
  let component: SlideBarDemoComponent;
  let fixture: ComponentFixture<SlideBarDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideBarDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideBarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
