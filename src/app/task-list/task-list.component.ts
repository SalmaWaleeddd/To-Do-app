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
  editTask = output<{ task: Task, newTitle: string }>();

  tasks = input<Task[]>();

  editingTaskId = signal<number | null>(null);

  toggleTaskCompletion(task: Task) {
    this.toggleTask.emit(task);
    console.log("Toggled Task:", task);
  }

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }

  isEditing(task: Task): boolean {
    return this.editingTaskId() === task.id;
  }

  cancelEdit() {
    this.editingTaskId.set(null);
  }

  startEdit(task: Task) {
    this.editingTaskId.set(task.id);
  }

  saveEdit(task: Task, newTitle: string) {
    this.editTask.emit({ task, newTitle });
    this.editingTaskId.set(null);
  }
}
