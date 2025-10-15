import { Injectable } from '@angular/core';
const KEY = 'jwt';

@Injectable({ providedIn: 'root' })
export class TokenService {
  get token() { return localStorage.getItem(KEY); }
  set token(v: string | null) {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  }
  get isAuthed() { return !!this.token; }
}

