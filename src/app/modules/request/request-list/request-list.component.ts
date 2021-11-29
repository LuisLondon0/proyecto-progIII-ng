import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { RequestModel } from 'src/app/models/request/request.model';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: RequestModel[] = [];
  
  constructor(
    private service: RequestService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: RequestModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}
