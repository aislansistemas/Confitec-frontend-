import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterUserComponent } from '../register-users/register-users.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  users:any = [];
  @ViewChild("register") register!: RegisterUserComponent;

  ngOnInit(): void {
    this.userService.get().subscribe(x => this.users = x);
  }

  redirectToRegister(id = null) {
    if (id) {
      this.router.navigate(["users", id, "edit"]);
    } else {
      this.router.navigate(["users", "new"]);
    }
    
  }
}