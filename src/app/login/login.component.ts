import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    

  ],
  templateUrl: './login.component.html', // This path is now relative to the new folder
  styleUrls: ['./login.component.scss'],   // This path is now relative to the new folder
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === 'admin' && password === 'password') {
        // Pass username to dashboard via navigation state
        this.router.navigate(['/dashboard'], { state: { username: username } });
      } else {
        this.loginError = 'Invalid username or password.';
      }
    }
  }

  onSsoLogin(): void {
    // For demonstration, we'll use a hardcoded SSO user email
    const ssoUser = 'sso.user@ecolab.com';
    this.router.navigate(['/dashboard'], { state: { username: ssoUser.split('@')[0] } });
  }

currentYear = new Date().getFullYear();
}