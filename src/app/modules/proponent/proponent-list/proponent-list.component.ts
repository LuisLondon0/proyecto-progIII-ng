import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { proponentService } from 'src/app/services/proponent/proponent.service';

@Component({
  selector: 'app-proponent-list',
  templateUrl: './proponent-list.component.html',
  styleUrls: ['./proponent-list.component.css']
})
export class ProponentListComponent implements OnInit {
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: ProponentModel[] = [];


  constructor(
    private service: proponentService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: ProponentModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    });
  }

}
