import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Task } from '../models/task';


@Component({
  selector: 'app-task-input',
  imports: [FormsModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss'
})
export class TaskInputComponent {
  taskTitle: string = '';
  addTask = output<Task>()

  onAddTask(taskForm: NgForm) {
    if (!this.taskTitle) return;
    
    const newTask: Task = {
      id: Date.now(),
      title: this.taskTitle,
      completed: false
    }

    this.addTask.emit(newTask);
    //this.taskTitle = '';
    taskForm.resetForm();
  }
}
