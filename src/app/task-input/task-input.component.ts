import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Task } from '../models/task';


@Component({
  selector: 'app-task-input',
  imports: [FormsModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss'
})
export class TaskInputComponent {
  taskTitle = signal<string>('');
  addTask = output<Task>();
  updatedTask = output<string>();
  cancelEdit = output<void>();

  taskToEdit = input<Task | null>();


  constructor() {
    effect(() => {
      const task = this.taskToEdit();
      if (task) {
        this.taskTitle.set(task.title);
      }
    });
  }

  onAddTask(taskForm: NgForm) {
    if (!this.taskTitle) return;

    if (this.taskToEdit()) {
      // Editing existing task case
      this.updatedTask.emit(this.taskTitle());
    } else {
      // Adding new task case
      const newTask: Task = {
        id: Date.now(),
        title: this.taskTitle(),
        completed: false
      }

      this.addTask.emit(newTask);
    }
    //this.taskTitle = '';
    taskForm.resetForm();
  }

  onCancelEdit(taskForm: NgForm) {
    this.cancelEdit.emit();
    taskForm.resetForm();
  }
}
