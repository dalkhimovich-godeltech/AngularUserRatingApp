import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../user-card/user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private _userId: number;
  private _user: User;
  private _errorMsg: string;

  get user(): User {
    return this._user;
  }

  private _editButtonTitle: string = "Edit Name";
  private _userNameInputValue: string;

  get editButtonTitle(): string {
    return this._editButtonTitle;
  }

  constructor(private _userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this._userService.getUser(id).then((res) => {this._user = res; });
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

  updateUser(user: User){
    console.log('on user updates - detail');
    this._userService.updateUser(user).catch(error => {
      console.log(error.message);
      this._errorMsg = error.message;
    });
  }
}
