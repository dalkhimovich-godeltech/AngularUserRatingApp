import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user-card/user';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { RateStyles } from '../RateStyles';
import { error, stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private _user: User;
  private _errorMsg: string;
  private _initialRating: number;

  get user(): User {
    return this._user;
  }

  get errorMsg(): string {
    return this._errorMsg;
  }

  private _editButtonTitle: string = "Edit Name";
  private _userNameInputValue: string;

  get editButtonTitle(): string {
    return this._editButtonTitle;
  }

  private _subscription: Subscription;

  constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    //const id = parseInt(this._route.snapshot.paramMap.get('id'));

    this._subscription = this._route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this._userService.getUser(id).then((res) => {
        this._user = res;
        this._initialRating = this._user.rate;
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

  public updateUser(user: User): void {
    console.log('on user updates - detail');
    this._userService.updateUser(user).catch(error => {
      console.log(error.message);
      this._errorMsg = error.message;
    });
  }

  public goPrev() {
    this._errorMsg = '';
    this._userService.getPrevId(this._user.id)
      .then(data => {
        return this._router.navigate(['../', data], { relativeTo: this._route });
      })
      .catch(err => {
        this._errorMsg = err;
        console.log('No PREV ID !!!');
        return;
      });
  }

  public goNext(): void {
    this._errorMsg = '';
    this._userService.getNextId(this._user.id)
      .then(data => {
        return this._router.navigate(['../', data], { relativeTo: this._route });
      })
      .catch(err => {
        this._errorMsg = err;
        console.log('No Next Id !!!');
        return;
      });
  }

  public gotoUsers(): void {
    let selectedId = this._user ? this.user.id : null;
    //this._router.navigate(['/users', {id: selectedId, rateDiff: this.getRateDiff()}]);
    this._router.navigate(['../', { id: selectedId, rateDiff: this.getRateDiff() }], { relativeTo: this._route });
  }

  private getRateDiff(): number {
    return this._user.rate - this._initialRating;
  }

  public showOverview(): void {
    this._router.navigate(['overview'], {relativeTo: this._route});
  }

  public showRating(): void {
    this._router.navigate(['rating'], {relativeTo: this._route});
  }

  public hideErrorDiv(): boolean {
    return !(this._errorMsg && this._errorMsg.length > 0);
  }



  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
