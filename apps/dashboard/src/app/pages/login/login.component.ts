// apps/dashboard/src/app/pages/login/login.component.ts
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { TokenService } from '../../core/token.service'; // ✅ correct relative path

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="min-h-dvh grid place-items-center p-6">
      <form class="w-full max-w-sm space-y-3" (ngSubmit)="submit()">
        <h1 class="text-2xl font-bold">Sign in</h1>

        <input
          class="w-full border rounded-lg px-3 py-2"
          [(ngModel)]="email"
          name="email"
          placeholder="Email"
        />

        <input
          class="w-full border rounded-lg px-3 py-2"
          type="password"
          [(ngModel)]="password"
          name="password"
          placeholder="Password"
        />

        <button class="w-full rounded-lg bg-black text-white py-2">
          Continue
        </button>

        <p class="text-xs text-gray-500">demo@demo.com / demo123</p>

        <button
          type="button"
          class="text-xs underline"
          (click)="devLogin()"
        >
          Skip (dev)
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  email = 'demo@demo.com';
  password = 'demo123';

  // use Angular's inject() to avoid constructor parameter injection
  private http = inject(HttpClient);
  private tokens = inject(TokenService);
  private router = inject(Router);

  // ✅ actual login call
  async submit() {
    try {
      const res = await firstValueFrom(
        this.http.post<{ access_token: string }>('/api/auth/login', {
          email: this.email,
          password: this.password,
        })
      );

      this.tokens.token = res?.access_token ?? null;
      this.router.navigateByUrl('/');
    } catch {
      alert('Login failed');
    }
  }

  // ✅ dev shortcut for UI testing
  devLogin() {
    this.tokens.token = 'dev-token';
    this.router.navigateByUrl('/');
  }
}
