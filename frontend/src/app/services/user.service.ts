import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_LOGIN_URL, USERS_REGISTER_URL } from '../shared/constants/urls';
import { Message } from 'primeng/api';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObserable: Observable<User>;

  messages: Message[] | undefined;

  constructor(private http: HttpClient) {
    this.userObserable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USERS_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user: User) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.messages = [{ severity: 'success', summary: 'Success', detail: `Welcome to Tech Taste ${user.name}` }];
        },
        error: (errorresponce) => {
          this.messages = [{ severity: 'error', summary: 'Error', detail: `${errorresponce}` }];
        }

      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USERS_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user:User) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.messages = [{ severity: 'success', summary: 'Success', detail: `${user.name} register successful` }];
        },
        error: (errorresponce) => {
          console.log(errorresponce)
          this.messages = [{ severity: 'error', summary: 'Error', detail: `${errorresponce}` }];
        }

      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as User;
    }
    return new User();
  }


}
