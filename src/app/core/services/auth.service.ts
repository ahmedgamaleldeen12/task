import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _state = signal<AuthState>({
    is_auth: false,
  });
  isAuth = computed(() => this._state().is_auth);
  constructor() {
    // Keep session persistence
    // const storedAuth = localStorage.getItem('isLoggedIn') === 'true';
    // if (storedAuth) {
    //   this._state.set({ is_auth: true });
    // }
  }

  // This approach will reset authentication state on a full page reload because it's purely stored in memory.
  login() {
    this._state.set({ is_auth: true });
  }
    // This approach will reset not authentication state on a full page reload.

  // login() {
  //   this._state.set({ is_auth: true });
  //   localStorage.setItem('isLoggedIn', 'true');
  // }
}

export type AuthState = {
  is_auth: boolean;
};
