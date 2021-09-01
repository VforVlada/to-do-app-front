import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: Task;

  @Output() deleteTask = new EventEmitter<Task>();
  @Output() completedTask = new EventEmitter<Task>();

  public faTimes = faTimes;

  constructor() { }
  
  public onDelete(task: Task) {
    this.deleteTask.emit(task);
  }

  public onComplete(task: Task) {
    this.completedTask.emit(task);
  }
}
