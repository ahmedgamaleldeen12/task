import { Injectable } from '@angular/core';
import { signalState, patchState } from '@ngrx/signals';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _state = signalState<AuthState>({
    is_auth: false,
  });
  constructor() {
    //Keep session persistence
    // const storedAuth = localStorage.getItem('isLoggedIn') === 'true';
    // if (storedAuth) {
    //   patchState(this._state, { is_auth: true });
    // }
  }

  // This approach will reset authentication state on a full page reload because it's purely stored in memory.
  login(): void {
    patchState(this._state, { is_auth: true });
  }

  // This approach will reset not authentication state on a full page reload.

  // login() {
  //   patchState(this._state, { is_auth: true });
  //   localStorage.setItem('isLoggedIn', 'true');
  // }
  isAuth(): boolean {
    return this._state.is_auth();
  }
}

export type AuthState = {
  is_auth: boolean;
};
