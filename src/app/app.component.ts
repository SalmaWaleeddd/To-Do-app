import { Component } from '@angular/core';


import { TaskManagerComponent } from './task-manager/task-manager.component';

@Component({
  selector: 'app-root',
  imports: [TaskManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'toDo';
}
