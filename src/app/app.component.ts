import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { HttpService } from './services/HttpService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-dynamic-config';

  users$: User[];

  constructor(public _httpService: HttpService) {
  }
  ngOnInit() {
    this.preloadUsersFromServer();
    //this.getCompletePrivileges();
  }

  //for testing purposes
  getCompletePrivileges() {
    this._httpService.getCompletePrivileges()
      .subscribe((data) => {
        console.log(data);
      });
  }

  preloadUsersFromServer() {
    this._httpService.getCompletePrivileges()
      .subscribe((data: User[]) => {
        this.users$ = data["users"];
      });

      
    
      //TODO: save to redux 
  }
}
