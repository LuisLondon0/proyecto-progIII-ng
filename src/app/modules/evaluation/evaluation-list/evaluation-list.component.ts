import { Component, OnInit } from '@angular/core';
import { GeneralData } from 'src/app/config/general-data';
import { EvaluationModel } from 'src/app/models/evaluation/evaluation.model';
import { JuryModel } from 'src/app/models/parameters/jury.model';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { JuryService } from 'src/app/services/parameters/jury.service';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit {

  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: EvaluationModel[] = [];

  constructor(
    private service: EvaluationService,
    private juryService: JuryService,
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: EvaluationModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length;
        this.GetJury();
      }
    })
  }

  GetJury() {
    for (let r of this.recordList) {
      if (r.juradoId) {
        this.juryService.SearchRecord(r.juradoId).subscribe({
          next: (data: JuryModel) => {
            r.jurado = data.nombre
          }
        })
      }
    }
  }
}
