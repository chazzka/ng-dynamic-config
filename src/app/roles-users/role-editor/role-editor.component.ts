import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.css']
})
export class RoleEditorComponent implements OnInit {

  status: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleStatus() {
    this.status = !this.status;
  }
  

}
