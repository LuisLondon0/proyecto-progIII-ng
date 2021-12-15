import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { FacultyService } from 'src/app/services/parameters/faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {
  
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: FacultyModel[] = [];
  
  constructor(
    private service: FacultyService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: FacultyModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}