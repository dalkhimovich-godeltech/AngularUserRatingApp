import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { User } from './user';
import { LikesPipe } from '../pipes/helper.pipes';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Output() userUpdated = new EventEmitter<User>();
  private _editButtonTitle: string = "Edit Name";
  private _userNameInputValue: string;

  // get user(): User {
  //   return this._user;
  // }

  // set user(newUser: User) {
  //   this._user = newUser;
  // }

  get editButtonTitle(): string {
    return this._editButtonTitle;
  }

  constructor() {
    //this._user = new User('Vasil', 33, 0, ['Angular', 'JavaScript', 'CSS']);

  }

  ngOnInit() {

  }

  public like(): void {
    this.user.increaseRate();
  }

  public dislike(user: User): void {
    user.decreaseRate();
  }

  public editName(userName: string):void {
    this._editButtonTitle === "Edit Name" ? this._editButtonTitle = "Stop Edit Name" : this._editButtonTitle = "Edit Name";
  }

  public isEditNameInputVisible(): boolean {
    return this._editButtonTitle === "Edit Name";
  }

  public isLikeButtonHidden(): boolean {
    return this.user.rate > 10;
  }

  public isDislikeButtonHidden(): boolean {
    return this.user.rate < -10;
  }

  public getRateDivClass(): string {
    if (this.user.rate < -5){
      return 'red';
    } else if (this.user.rate > 5){
      return 'green';
    }

    return 'yellow';
  }

  public updateUser(user: User){
    console.log('update user - child');
    this.userUpdated.emit(user);
  }


}


