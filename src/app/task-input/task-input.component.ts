import { Component,output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-input',
  imports: [FormsModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss'
})
export class TaskInputComponent {
  task: string = '';
  addTask=output<string>()

  onAddTask() {
    if(!this.task) return;
    this.addTask.emit(this.task);
    this.task='';   
  }
}
