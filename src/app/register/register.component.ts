import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
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

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu và xác nhận mật khẩu không khớp!';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(
      response => {
        this.successMessage = 'Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.';
        this.errorMessage = '';
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
