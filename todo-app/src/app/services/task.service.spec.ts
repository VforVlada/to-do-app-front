import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Task } from '../models/Task';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TaskService ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  it('should retrieve all tasks from the API', () => {
    const toDoItems : Task[]= [
      {
        id:1,
        description: "description",
        isComplete: true
      },
      {
        id:2,
        description: "description2",
        isComplete: false
      }
    ];

    service.getTasks().subscribe(tasks => 
    {
        expect(tasks.length).toBe(2);
        expect(tasks).toEqual(toDoItems);
    });

    const request = httpMock.expectOne(`${service.actionUrl}`);

    expect(request.request.method).toBe('GET');
    request.flush(toDoItems);
  });

  it('should add task to the API', () => {
    const toDoItem : Task = {
      description: "description",
      isComplete: true
    };

    service.addTask(toDoItem).subscribe(task => 
    {
      expect(task).toEqual(toDoItem);
    });

    const request = httpMock.expectOne(`${service.actionUrl}`);

    expect(request.request.method).toBe('POST');
    request.flush(toDoItem);
  });

  it('should update task', () => {
    const toDoItem : Task = {
      id: 1,
      description: "description",
      isComplete: true
    };

    service.updateTask(toDoItem).subscribe(task => 
    {
      expect(task).toEqual(toDoItem);
    });

    const request = httpMock.expectOne(`${service.actionUrl}/${toDoItem.id}`);

    expect(request.request.method).toBe('PUT');
    request.flush(toDoItem);
  });

  it('should delete task', () => {
    const toDoItem : Task = {
      id: 1,
      description: "description",
      isComplete: true
    };

    service.deleteTask(toDoItem.id).subscribe();

    const request = httpMock.expectOne(`${service.actionUrl}/${toDoItem.id}`);

    expect(request.request.method).toBe('DELETE');
    request.flush(1);
  });
});
