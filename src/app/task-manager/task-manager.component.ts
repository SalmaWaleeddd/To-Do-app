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
  tasks=signal<Task[]>([]);


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
  
  editTask(event: { task: Task, newTitle: string }) {
  this.tasks.update(tasks => 
    tasks.map(t => 
      t.id === event.task.id ? { ...t, title: event.newTitle } : t
    )
  );
  this.saveToLocalStorage();
}

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
