import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { RequestProponentModel } from 'src/app/models/request/request-proponent.model';
import { RequestModel } from 'src/app/models/request/request.model';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';
import { proponentService } from 'src/app/services/proponent/proponent.service';
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
    private service: RequestService,
    private proponentService: proponentService,
    private lineOfResearchService: LineOfResearchService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: RequestModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
        this.GetLineOfResearch()
        this.GetProponents();
      }
    })
  }

  GetProponents(){
    for(let r of this.recordList){
      if(r.id){
        let proponents : ProponentModel[] = []
        this.service.GetProponents(r.id).subscribe({
          next: (data: RequestProponentModel[]) => {
            for(let rp of data){
              if(rp.proponenteId){
                this.proponentService.SearchRecord(rp.proponenteId).subscribe({
                  next: (d: ProponentModel) => {
                      proponents.push(d)
                  }
                })
              }
            }
            r.proponents = proponents
          }
        })
      }
    }
  }

  GetLineOfResearch(){
    for(let r of this.recordList){
      if(r.areaInvestigacionId){
        this.lineOfResearchService.SearchRecord(r.areaInvestigacionId).subscribe({
                  next: (data: LineOfResearchModel) => {
                      r.areaInvestigacion = data
                  }
                })
      }
    }
  }
}
