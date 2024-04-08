import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storage$: Subject<{ key: string, value: string | null }> = new Subject();

  constructor() {
    window.addEventListener('storage', (event) => {
      this.storage$.next({ key: event.key, value: event.newValue });
    });
  }

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
    this.storage$.next({ key, value });
  }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
    this.storage$.next({ key, value: null });
  }

  watchStorage(): Observable<{ key: string, value: string | null }> {
    return this.storage$.asObservable();
  }
}
