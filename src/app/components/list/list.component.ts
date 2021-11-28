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
    this.taskService.getTasksFromLS()
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
  }

  public addTaskForRemove(task: any) {
    this.activeTask = task;
  }
  public removeTask() {
    this.taskService.removeTask(this.activeTask)
  }

}
