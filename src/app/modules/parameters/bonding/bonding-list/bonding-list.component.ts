import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { BondingModel } from 'src/app/models/parameters/bonding.model';
import { BondingService } from 'src/app/services/parameters/bonding.service';

@Component({
  selector: 'app-bonding-list',
  templateUrl: './bonding-list.component.html',
  styleUrls: ['./bonding-list.component.css']
})
export class BondingListComponent implements OnInit {
  
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: BondingModel[] = [];
  
  constructor(
    private service: BondingService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: BondingModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
      }
    })
  }
}