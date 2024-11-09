import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';  // Đảm bảo import HttpClientModule
import { CommonModule } from '@angular/common';  // Đảm bảo import CommonModule


@Component({
  selector: 'app-register',
  standalone: true,  // Đảm bảo đây là Standalone Component
  imports: [FormsModule, HttpClientModule, CommonModule],  // Import FormsModule để sử dụng ngModel
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  // Phương thức đăng ký người dùng
  register(): void {
    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu và xác nhận mật khẩu không khớp!';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Gọi phương thức đăng ký từ AuthService
    this.authService.register(user).subscribe(
      response => {
        this.successMessage = 'Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.';
        this.errorMessage = '';

        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        this.errorMessage = 'Đăng ký không thành công. Vui lòng thử lại.';
        this.successMessage = '';
      }
    );
  }
}
