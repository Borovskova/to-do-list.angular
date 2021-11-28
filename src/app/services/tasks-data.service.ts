import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksDataService {

  public list: any = [];
  public newTask: any;


  constructor() { }

  public removeTask(task: any) {
    let taskForRemove = this.list.findIndex((item: any) => item.id === task.id);
    this.list.splice(taskForRemove, 1)
    this.list.forEach((item: any) => item.id = this.list.indexOf(item))
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  public getTasksFromLS() {
    let listFromLS: any = localStorage.getItem('list');
    if (listFromLS) {
      JSON.parse(listFromLS).forEach((task: any) => {
        if (this.list) {
          let sameTask = this.list.find((item: any) => item.id == task.id);
          if (!sameTask) {
            this.list.push(task)
          }
        }
      })
    }
  }
}
