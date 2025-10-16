import { Component , output, input} from '@angular/core';
import { NgClass } from '@angular/common';

import { Task } from '../models/task';


@Component({
  selector: 'app-task-list',
  imports: [NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  tasks=input<Task[]>();
  deleteTask= output<Task>();
  toggleTask= output<Task>();

  toggleTaskCompletion(task: Task) {
    this.toggleTask.emit(task);
    console.log("Toggled Task:", task);
  }

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
    console.log("Deleted Task:", task);

  }
}
