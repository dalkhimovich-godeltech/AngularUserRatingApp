import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user-card/user';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { RateStyles } from '../RateStyles';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css']
})
export class UserRatingComponent implements OnInit {

  private _user: User;
  private _errorMsg: string;
  private _subscription: Subscription;

  get user(): User {
    return this._user;
  }

  private _editButtonTitle: string = "Edit Name";
  private _userNameInputValue: string;

  get editButtonTitle(): string {
    return this._editButtonTitle;
  }

  constructor(private _userService: UserService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._subscription = this._route.parent.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this._userService.getUser(id).then((res) => {
        this._user = res;
      });
    });
  }

  public like(): void {
    this.user.increaseRate();
  }

  public dislike(user: User): void {
    user.decreaseRate();
  }

  public editName(userName: string): void {
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
    if (this.user.rate < -5) {
      return 'red';
    } else if (this.user.rate > 5) {
      return 'green';
    }

    return RateStyles.Yellow;
  }

}
