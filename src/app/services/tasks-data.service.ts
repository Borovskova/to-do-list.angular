import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksDataService {

  public list: any = [];
  public newTask: any;
  public listFromLocalStorage: any;

  constructor() { }

  public removeTask(task: any) {
    let taskForRemove = this.list.findIndex((item: any) => item.id === task.id);
    this.list.splice(taskForRemove, 1)
    this.newTask.id = this.list.indexOf(this.newTask);
    localStorage.setItem('list', JSON.stringify(this.list));
  }
}
