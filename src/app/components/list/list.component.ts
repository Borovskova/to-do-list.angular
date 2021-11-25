import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksDataService } from 'src/app/services/tasks-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public isAddFormVissible: boolean = false;
  public listForm: FormGroup;
  public activeTask: any;



  constructor(public taskService: TasksDataService, private router: Router) {
    this.listForm = new FormGroup({
      "titleOfTask": new FormControl('', [Validators.required]),
      "descriptionOfTask": new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    let listFromLS: any = localStorage.getItem('list');
    if (listFromLS) {
      JSON.parse(listFromLS).forEach((task: any) => {
        if (this.taskService.list) {
          let sameTask = this.taskService.list.find((item: any) => item.id == task.id);
          if (!sameTask) {
            this.taskService.list.push(task)
          }
        }
      })
    }
  }

  public showForm() {
    this.isAddFormVissible = true;
  }
  public addNewTask() {
    this.taskService.newTask = this.listForm.value;
    this.taskService.list.push(this.taskService.newTask)
    this.taskService.newTask.id = this.taskService.list.indexOf(this.taskService.newTask);
    this.listForm.reset()
    this.isAddFormVissible = false;
    localStorage.setItem('list', JSON.stringify(this.taskService.list));
  }
  public editTask(task: any) {
    this.router.navigate(['edit-list', task.id])
    localStorage.setItem('id', task.id)
  }

  public addTaskForRemove(task: any) {
    this.activeTask = task;
  }
  public removeTask() {
    this.taskService.removeTask(this.activeTask)
  }

}
