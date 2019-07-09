import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.state';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public ngxSmartModalService: NgxSmartModalService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  cancelClicked() {
    this.ngxSmartModalService.getModal("myModal").open();    
  }

  reload() {
    location.reload();
  }

  save() {
    //TODO: save
    console.log(this.store.select("users"));
    console.log(this.store.select("rolesWithPrivilege"));
  }

}
