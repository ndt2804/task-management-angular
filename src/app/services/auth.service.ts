import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44336/api/Auth';  // Thay bằng URL của API backend của bạn

  constructor(private http: HttpClient) { }

  // Phương thức đăng ký người dùng
  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);  // Gọi API đăng ký
  }

  // Phương thức đăng nhập người dùng
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);  // Gọi API đăng nhập
  }
}
