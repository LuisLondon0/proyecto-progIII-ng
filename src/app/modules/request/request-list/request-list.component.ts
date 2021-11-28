import { Component, OnInit } from '@angular/core';
import { RequestModel } from 'src/app/models/request/request.model';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

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
      }
    })
  }
}
