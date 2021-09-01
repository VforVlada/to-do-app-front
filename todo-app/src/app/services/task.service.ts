import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../models/Task';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public actionUrl = 'https://localhost:44331/api/todoitems';

  constructor(private _http: HttpClient) { }

  public getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this.actionUrl).pipe(
      catchError(this.handleError<Task[]>([]))
    );
  }

  public addTask(task:Task): Observable<Task> {
    return this._http.post<Task>(this.actionUrl, task).pipe(
      catchError(this.handleError<Task>())
    );
  }

  public updateTask(task: any): Observable<Task>{
    return this._http.put<Task>(`${this.actionUrl}/${task.id}`, task).pipe(
      catchError(this.handleError<Task>())
    );
  }

  public deleteTask(id: any): Observable<Task>{
    return this._http.delete<Task>(`${this.actionUrl}/${id.toString()}`).pipe(
      catchError(this.handleError<Task>())
    );
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.error(errorMessage);

      return of(result as T);
    };
  }
}
