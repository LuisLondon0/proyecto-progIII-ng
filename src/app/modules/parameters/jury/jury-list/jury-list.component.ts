import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { JuryModel } from 'src/app/models/parameters/jury.model';
import { JuryService } from 'src/app/services/parameters/jury.service';

@Component({
  selector: 'app-jury-list',
  templateUrl: './jury-list.component.html',
  styleUrls: ['./jury-list.component.css']
})
export class JuryListComponent implements OnInit {

  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: JuryModel[] = [];

  constructor(
    private service: JuryService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: JuryModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}
