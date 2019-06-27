import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from './user';
import { LikesPipe } from '../pipes/helper.pipes';
import { Router, ActivatedRoute } from '@angular/router';
import { RateStyles } from '../RateStyles';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Input() rateDiff: number;
  @Output() userUpdated = new EventEmitter<User>();
  private _editButtonTitle: string = "Edit Name";
  private _userNameInputValue: string;

  get editButtonTitle(): string {
    return this._editButtonTitle;
  }

  constructor(private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit() {
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
      return RateStyles[RateStyles.Red];
    } else if (this.user.rate > 5) {
      return RateStyles[RateStyles.Green];
    }

    return RateStyles[RateStyles.Yellow];
  }

  public updateUser(user: User) {
    console.log('update user - child');
    this.userUpdated.emit(user);
  }

  onSelect(user: User) {
    this._router.navigate([user.id], {relativeTo: this._route});
  }

  public getBackRateCssClass(): string {
    if (this.rateDiff === undefined) {
      return undefined;
    }
    if (this.rateDiff > 0) {
      return RateStyles.Green;
    } else if (this.rateDiff < 0) {
      return RateStyles.Red;
    }

    return RateStyles.Yellow;

  }

}
