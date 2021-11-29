import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { TypeOfRequestModel } from 'src/app/models/parameters/type-of-request.model';
import { TypeOfRequestService } from 'src/app/services/parameters/type-of-request.service';

@Component({
  selector: 'app-type-of-request-list',
  templateUrl: './type-of-request-list.component.html',
  styleUrls: ['./type-of-request-list.component.css']
})
export class TypeOfRequestListComponent implements OnInit {
  
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: TypeOfRequestModel[] = [];
  
  constructor(
    private service: TypeOfRequestService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: TypeOfRequestModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}