import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  newTask: { title: string, assignedTo: { name: string } } = { title: '', assignedTo: { name: '' } };
  editingTask: any = null;
  user: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listTasks();
    this.getUserInfo();
  }

  listTasks(): void {
    this.http.get<any[]>('https://localhost:44336/api/Task').subscribe(data => {
      this.tasks = data;
    });
  }

  createTask(task: { title: string, assignedTo: { name: string } }): void {
    this.http.post('https://localhost:44336/api/Task', task).subscribe(() => {
      this.listTasks();
      this.newTask = { title: '', assignedTo: { name: '' } };
    });
  }

  editTask(taskId: number, updatedTask: any): void {
    this.http.put(`https://localhost:44336/api/Task/${taskId}`, updatedTask).subscribe(() => {
      this.listTasks();
      this.editingTask = null;
    });
  }

  deleteTask(taskId: number): void {
    this.http.delete(`https://localhost:44336/api/Task/${taskId}`).subscribe(() => {
      this.listTasks();
    });
  }

  get ongoingTasks() {
    return this.tasks.filter(t => !t.completed);
  }

  get completedTasks() {
    return this.tasks.filter(t => t.completed);
  }

  getUserInfo(): void {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
  }
}