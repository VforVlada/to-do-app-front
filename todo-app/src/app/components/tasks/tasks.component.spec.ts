import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskService } from 'src/app/services/task.service';
import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ TasksComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('calls getTasks', () => {
      spyOn(component, 'getTasks').and.callThrough();
      component.ngOnInit();
      expect(component.getTasks).toHaveBeenCalled();
    });
  });

  describe('getHeroes', () => {
    it('makes expected calls to taskService', () => {
      const taskServiceStub: TaskService = TestBed.inject(TaskService);
      spyOn(taskServiceStub, 'getTasks').and.callThrough();
      component.getTasks();
      expect(taskServiceStub.getTasks).toHaveBeenCalled();
    });
  });

  it('should show app-add-task', () => {
    expect(fixture.debugElement.query(By.css('app-add-task'))).toBeTruthy()  
  });
});
