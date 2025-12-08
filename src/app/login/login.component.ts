import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',  // relative path
  styleUrls: ['./login.component.scss'], // relative path
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLoginClick(): void {
  this.errorMessage = null;
  const email = (this.email || '').trim();
  const password = this.password || '';

  if (!email || !password) {
    this.errorMessage = 'Email and password are required.';
    return;
  }

  this.authService.login(email, password).subscribe({
    next: (response: any) => {
      // Normalize casing differences
      const message = response.message || response.Message;
      const success = response.success || false;
      const userId = response.userId || response.UserId;
      const redirectUrl = response.redirectUrl || response.RedirectUrl;

      if (message === 'Login successful' || success === true) {
        if (userId) {
          this.authService.setUserId(String(userId));
        }
        // Always redirect to dashboard on successful login
        this.router.navigate([redirectUrl || '/dashboard']);
      } else {
        // ❌ Show error message
        this.errorMessage = message || 'Invalid email or password.';
      }
    },
    error: (err) => {
      this.errorMessage = err?.error?.message || 'Login failed.';
    }
  });
}


  onForgotPassword(): void {
    // Placeholder for forgot password functionality
    alert('Forgot password functionality coming soon!');
  }

  onSignUp(): void {
    // Navigate to register page
    this.router.navigate(['/register']);
  }

  onSSO(): void {
    // Redirect to dashboard page
    this.router.navigate(['/dashboard']);
  }

  currentYear = new Date().getFullYear();
}
