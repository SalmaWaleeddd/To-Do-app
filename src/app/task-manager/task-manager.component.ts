import { Component, signal } from '@angular/core';
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
  tasks = signal<Task[]>([]);

  taskToEdit = signal<Task | null>(null);


  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks.set(JSON.parse(savedTasks));
    }
  }

  addTask(task: Task) {
    this.tasks.update(tasks => [...tasks, task]);
    console.log(this.tasks());
    this.saveToLocalStorage();
  }

  deleteTask(task: Task) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== task.id));
    this.saveToLocalStorage();
  }

  toggleTask(task: Task) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
    this.saveToLocalStorage();
  }

  editTask(task: Task) {
    this.taskToEdit.set(task);
  }

  saveChanges(updatedTitle:string) {
    const taskToUpdate = this.taskToEdit();
    if (!taskToUpdate) return;
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === taskToUpdate.id ? { ...t, title:updatedTitle } : t
      )
    );
    this.taskToEdit.set(null);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
