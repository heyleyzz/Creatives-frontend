import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitWorkComponent } from './submit-work.component';

describe('SubmitWorkComponent', () => {
  let component: SubmitWorkComponent;
  let fixture: ComponentFixture<SubmitWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitWorkComponent], // ✅ standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ✅ important
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});