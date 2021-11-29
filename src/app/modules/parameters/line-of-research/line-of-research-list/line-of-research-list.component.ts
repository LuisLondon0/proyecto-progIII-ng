import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';

@Component({
  selector: 'app-line-of-research-list',
  templateUrl: './line-of-research-list.component.html',
  styleUrls: ['./line-of-research-list.component.css']
})
export class LineOfResearchListComponent implements OnInit {
  
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: LineOfResearchModel[] = [];
  
  constructor(
    private service: LineOfResearchService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: LineOfResearchModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}