import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { ModalityModel } from 'src/app/models/parameters/modality.model';
import { ModalityService } from 'src/app/services/parameters/modality.service';

@Component({
  selector: 'app-modality-list',
  templateUrl: './modality-list.component.html',
  styleUrls: ['./modality-list.component.css']
})
export class ModalityListComponent implements OnInit {
  
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: ModalityModel[] = [];
  
  constructor(
    private service: ModalityService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: ModalityModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}
