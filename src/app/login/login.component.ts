import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';  // Đảm bảo import HttpClientModule
import { CommonModule } from '@angular/common';  // Đảm bảo import CommonModule
@Component({
  selector: 'app-login',
  standalone: true,  // Đảm bảo đây là Standalone Component
  imports: [FormsModule, HttpClientModule, CommonModule],  // Import FormsModule để sử dụng ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  // Phương thức xử lý đăng nhập
  login(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    // Gọi phương thức đăng nhập từ AuthService
    this.authService.login(credentials).subscribe(
      (response) => {
        // Đăng nhập thành công, chuyển hướng người dùng đến trang chính hoặc dashboard
        this.successMessage = 'Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      (error) => {
        // Hiển thị thông báo lỗi nếu đăng nhập thất bại
        this.errorMessage = 'Đăng nhập thất bại! Kiểm tra lại thông tin.';
      }
    );
  }
}
