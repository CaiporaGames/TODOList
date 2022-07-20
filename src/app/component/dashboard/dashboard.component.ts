import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

task : Task = new Task();
tasks : Task[] = []

addTaskValue : string = ''
editTaskValue : string = ''
disableInput: boolean = false
  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.addTaskValue = ''
    this.editTaskValue = ''
    this.task = new Task();
    this.tasks = []
    this.crudService.getAllTask().subscribe({
      next: response => this.tasks = response,
      error: error => alert(error)})
  }

  addTask() : void {
    if(this.addTaskValue === '') 
    {
      alert('Must not be empty!')
      return
    }
    this.task.name = this.addTaskValue
    this.crudService.addTask(this.task).subscribe({
      next: 
        res =>{this.ngOnInit();
        this.addTaskValue = ''
      },
      error: error => alert(error)
    })
  }

  editTask():void{
    this.task.name = this.editTaskValue
    this.crudService.editTask(this.task).subscribe(response=>{
      this.ngOnInit();
    }, error => alert(error))
  }

  deleteTask(task:Task){
    this.crudService.deleteTask(task).subscribe(response => {
      this.ngOnInit()
    }, error => alert(error))
  }

  call(task:Task):void {
    this.task = task;
    this.editTaskValue = task.name
  }

}
