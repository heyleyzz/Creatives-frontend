import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTasksComponent } from './MyTask.component';

describe('MyTasksComponent', () => {
  let component: MyTasksComponent;
  let fixture: ComponentFixture<MyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTasksComponent], // ✅ standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(MyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ✅ important
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});