import { Component, output, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { Task } from '../models/task';


@Component({
  selector: 'app-task-list',
  imports: [NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  deleteTask = output<Task>();
  toggleTask = output<Task>();
  editTask = output<Task>();

  tasks = input<Task[]>();

  toggleTaskCompletion(task: Task) {
    this.toggleTask.emit(task);
    console.log("Toggled Task:", task);
  }

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }

/*   //TODO: remove it after update in code
  isEditing(task: Task): boolean {
    return this.editingTaskId() === task.id;
  }
  //TODO: remove it after update in code
  cancelEdit() {
    this.editingTaskId.set(null);
  } */

  startEdit(task: Task) {
    this.editTask.emit(task);
  }

  //TODO: remove it after update in code
/*   saveEdit(task: Task, newTitle: string) {
    this.editTask.emit({ task, newTitle });
    this.editingTaskId.set(null);
  } */
}
