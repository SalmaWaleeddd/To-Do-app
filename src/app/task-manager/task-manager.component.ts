import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskInputComponent } from '../task-input/task-input.component';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-manager',
  imports: [TaskInputComponent, TaskListComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent {
  tasks: Task[] = [];


  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveToLocalStorage();
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.saveToLocalStorage();
  }

  toggleTask(task: Task) {
    const t = this.tasks.find(t => t.id === task.id);
    if (t) {
      t.completed = !t.completed;
      this.saveToLocalStorage();
    }
  }
  
  editTask(event: { task: Task, newTitle: string }) {
    const t = this.tasks.find(t => t.id === event.task.id);
    if (t) {
      t.title = event.newTitle;
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
