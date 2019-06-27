import { Injectable } from '@angular/core';
import { User } from './user-card/user';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, share, publishReplay, refCount } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
//gimport 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url = 'http://localhost:3000/users/';
  constructor(private _http: HttpClient) { }

  // getUsers(): Observable<User[]> {
  //   return this._http.get<User[]>(this._url).pipe(
  //     map(data => data as User[]),
  //     catchError(error => {
  //       return throwError(error.message);
  //     })

  //   );
  // }

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._url).pipe(
      map(res => {
        return res.map(item => {
          return User.ConvertFromJson(item);
        });
      }),
      catchError(this.errorHandler)
    );
  }

  public getUser(userId: number): Promise<User> {
    return this._http.get<User>(this._url + userId).pipe(
      map((data: User) => User.ConvertFromJson(data)),
      catchError(this.errorHandler)
    ).toPromise();
  }

  public updateUser(user: User): Promise<User> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log('update user - service . User = ' + user.name);
    return this._http.put<User>(this._url + user.id, user.stringify(), httpOptions)
      .pipe(
        map((data: User) => User.ConvertFromJson(data)),
        catchError(this.errorHandler)
      ).toPromise();
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(error);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  public getNextId(userId: number): Promise<number> {
    return this.getUsers().toPromise().then(data => {
      const el = data.find(e => e.id === userId);
      if (el) {
        const index = data.indexOf(el);
        if (index + 1 < data.length) {
          return data[index + 1].id;
        }
      }
      return Promise.reject('Next user for id = ' + userId + ' not found');
    });
  }

  public getPrevId(userId: number): Promise<number> {
    return this.getUsers().toPromise().then(data => {
      const el = data.find(e => e.id === userId);
      if (el) {
        const index = data.indexOf(el);
        if (index > 0) {
          return data[index - 1].id;
        }
      }
      return Promise.reject('Previous user for id = ' + userId + ' not found');
    });
  }
}
