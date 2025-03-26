import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent implements OnInit {
  public username = signal('');
  public password = signal('');

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    if (this.username() === 'admin' && this.password() === 'admin') {
      this.authService.login();
      this.router.navigate(['/products']);
    } else {
      alert('Invalid email or password');
    }
  }

  public isFormValid = computed(() => {
    return this.username().length > 0 && this.password().length > 0;
  });
}
