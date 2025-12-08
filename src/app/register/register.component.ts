import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, RegisterRequest } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  currentYear: number = new Date().getFullYear();

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      division: ['', Validators.required],
      businessUnit: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: RegisterRequest = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        name: this.registerForm.value.name,
        division: this.registerForm.value.division,
        businessUnit: this.registerForm.value.businessUnit
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          // Handle successful registration
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // Handle registration error
          console.error('Registration failed', error);
          // You can add error handling UI here
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
