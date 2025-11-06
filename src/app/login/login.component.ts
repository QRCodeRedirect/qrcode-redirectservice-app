import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../create-batch/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html', // This path is now relative to the new folder
  styleUrls: ['./login.component.scss'],   // This path is now relative to the new folder
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      let userToLogin: User | null = null;

      if (email === 'admin@ecolab.com' && password === 'password') {
        userToLogin = { id: 'admin-id-001', name: 'Admin User', role: 'admin' };
      } else if (email === 'user@ecolab.com' && password === 'password') {
        // Added a normal user for testing
        userToLogin = { id: 'user-id-123', name: 'Normal User', role: 'user' };
      }

      if (userToLogin) {
        this.authService.login(userToLogin);
        // Navigate to the main dashboard
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = 'Invalid email or password.';
      }
    }
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