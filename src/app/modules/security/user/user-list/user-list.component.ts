import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/user-data.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  recordList: UserData[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
