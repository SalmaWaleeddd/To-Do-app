import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TaskInputComponent } from './task-input/task-input.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TaskInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'toDo';
}
