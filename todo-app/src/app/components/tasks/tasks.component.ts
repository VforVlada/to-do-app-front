import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/Task'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];

  constructor(private _taskService: TaskService) { }

  public ngOnInit(): void {
    this.getTasks();
  }

  public onTaskAdded(task: Task) {
    this.tasks.push(task);
  }

  public onDeleteTask(task:Task) {
    this._taskService.deleteTask(task.id).subscribe();
    this.tasks = this.tasks.filter(el => el.id != task.id);
  }

  public onCompleteTask(task: Task) {
    this._taskService.updateTask(task).subscribe();
  }
  
  public getTasks() {
    this._taskService.getTasks().subscribe(data=> this.tasks = data);
  }
}
