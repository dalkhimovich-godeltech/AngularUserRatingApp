import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user-card/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { error } from 'util';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  private _users$: Observable<User[]>;
  private _errorMsg: string;

  get users$(): Observable<User[]>{
    return this._users$;
  }

  get errorMsg(): string{
    return this._errorMsg;
  }

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this._users$ = this._userService.getUsers().pipe(
      catchError(error => {this._errorMsg = error.message; return throwError(error); } )
    );

  }

  onUserUpdated(user: User){
    console.log('on user updates - parent');
    this._userService.updateUser(user).catch(error => {
      console.log(error.message);
      this._errorMsg = error.message;
    });
    //updatedUser.subscribe(val => console.log('updated on component = ' + val.name));
  }

}
