import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/Task'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter();
  public task: Task;
  public description: string;

  constructor(private _taskService: TaskService) { }

  public addTask() {
    if (this.description) {
      this.task = {
        description: this.description,
        isComplete: false
      }
      this._taskService.addTask(this.task).subscribe(data => {
        this.taskAdded.emit(data);
        this.description = '';
      });
    }
  }
}
