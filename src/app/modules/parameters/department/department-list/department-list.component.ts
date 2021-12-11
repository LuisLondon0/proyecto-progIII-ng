import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { DepartmentModel } from 'src/app/models/parameters/department.model';
import { DepartmentService } from 'src/app/services/parameters/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: DepartmentModel[] = [];
  
  constructor(
    private service: DepartmentService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: DepartmentModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}