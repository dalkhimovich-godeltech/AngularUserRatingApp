import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user-card/user';
import { Observable, throwError, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { error } from 'util';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  private _users$: Observable<User[]>;
  private _errorMsg: string;
  private _selectedId: number;
  private _rateDiff: number;

  private _subscription: Subscription;

  get users$(): Observable<User[]> {
    return this._users$;
  }

  get errorMsg(): string {
    return this._errorMsg;
  }

  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._users$ = this._userService.getUsers().pipe(
      catchError(error => { this._errorMsg = error.message; return throwError(error); })
    );

    this._subscription = this._route.paramMap.subscribe((params: ParamMap) => {
      this._selectedId = parseInt(params.get('id'));
      this._rateDiff = parseInt(params.get('rateDiff'));
    });

  }

  onUserUpdated(user: User) {
    console.log('on user updates - parent');
    this._userService.updateUser(user).catch(error => {
      console.log(error.message);
      this._errorMsg = error.message;
    });
  }

  public isIncreased(user: User): boolean {
    return user.id === this._selectedId;
  }

  public isDecreased(user: User): boolean {
    return user.id === this._selectedId;
  }

  public getRateDiffForUser(user: User): number {
    if (user.id === this._selectedId) {
      return this._rateDiff;
    }
    return undefined;

  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }




}
