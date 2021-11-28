import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksDataService } from 'src/app/services/tasks-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private routeSubscription: Subscription;
  private id: any;
  public task: any;
  public descriptionOfTask: any;
  public titleOfTask: any;
  public modalBodyText: any;
  private isRemove: boolean = false;
  private isCancelEdit: boolean = false;


  constructor(private route: ActivatedRoute, public taskService: TasksDataService, private router: Router) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.taskService.getTasksFromLS()
    this.task = this.taskService.list.find((item: any) => item.id == this.id);
    this.descriptionOfTask = this.task.descriptionOfTask;
    this.titleOfTask = this.task.titleOfTask;
  }


  public defineAction(action: string) {
    if (action === 'cancel edit') {
      this.modalBodyText = 'Do you really want to cancel edit of this task?';
      this.isCancelEdit = true;
      this.isRemove = false;
    } else if (action === 'remove task') {
      this.modalBodyText = 'Do you really want to delete this task?';
      this.isRemove = true;
      this.isCancelEdit = false;
    } else if (action === 'save task') {
      this.modalBodyText = 'Do you really want to save changes?';
    }
  }
  public performAnAction() {
    if (this.isRemove) {
      this.removeTask()
    } else if (this.isCancelEdit) {
      this.cancelEdit()
    } else {
      this.saveChanges()
    }
  }
  public saveChanges() {
    this.task.titleOfTask = this.titleOfTask;
    this.task.descriptionOfTask = this.descriptionOfTask;
    localStorage.setItem('list', JSON.stringify(this.taskService.list));
    this.router.navigate(['list']);
  }
  public removeTask() {
    this.taskService.removeTask(this.task);
    this.router.navigate(['list']);
  }
  public cancelEdit() {
    this.router.navigate(['list']);
  }
}
