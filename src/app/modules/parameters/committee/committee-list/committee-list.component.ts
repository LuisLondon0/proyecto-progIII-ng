import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';
import { CommitteeService } from 'src/app/services/parameters/committee.service';

@Component({
  selector: 'app-committee-list',
  templateUrl: './committee-list.component.html',
  styleUrls: ['./committee-list.component.css']
})
export class CommitteeListComponent implements OnInit {
  
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: CommitteeModel[] = [];
  
  constructor(
    private service: CommitteeService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: CommitteeModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}
