import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { UserData } from 'src/app/models/user-data.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  recordList: UserData[] = [];
  pageSize: number = GeneralData.RECORDS_BY_PAGE;

  p: number = 1;
  total: number = 0

  constructor(
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.GetRecordList()
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: UserData[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    });
  }

}
