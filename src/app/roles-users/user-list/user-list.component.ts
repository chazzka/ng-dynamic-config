import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  status: boolean = false;

  //load user from redux and save user to redux and edit user with redux here
  constructor() { }

  ngOnInit() {
  }

  toggleStatus() {
    this.status = !this.status;
  }

}
