import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user-card/user';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {

  private _user: User;
  private _errorMsg: string;
  private _subscription: Subscription;

  get user(): User {
    return this._user;
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

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
