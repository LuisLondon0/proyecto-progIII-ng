import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { EvaluationModel } from 'src/app/models/evaluation/evaluation.model';
import { JuryModel } from 'src/app/models/parameters/jury.model';
import { RequestModel } from 'src/app/models/request/request.model';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { JuryService } from 'src/app/services/parameters/jury.service';
import { RequestService } from 'src/app/services/request/request.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;

@Component({
  selector: 'app-evaluation-creation',
  templateUrl: './evaluation-creation.component.html',
  styleUrls: ['./evaluation-creation.component.css']
})
export class EvaluationCreationComponent implements OnInit {
  requestList: RequestModel[] = [];
  juryList: JuryModel[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: EvaluationService,
    private juryService: JuryService,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.GetOptionsToSelects();
  }

  GetOptionsToSelects() {
    this.juryService.GetRecordList().subscribe({
      next: (data: JuryModel[]) => {
        this.juryList = data;
        setTimeout(() => {
          InitSelectById("selJury");
        }, 100)
      }
    })

    this.requestService.GetRecordList().subscribe({
      next: (data: RequestModel[]) => {
        this.requestList = data;
        setTimeout(() => {
          InitSelectById("selRequest");
        }, 100)
      }
    })
  }

  CreateForm() {
    this.form = this.fb.group({
      fechaInvitacion: ["", [Validators.required]],
      juradoId: ["", [Validators.required]],
      solicitudId: ["", [Validators.required]],
    })
  }

  SaveRecord() {
    let model = new EvaluationModel();

    let date: Date = new Date(this.form.controls["fechaInvitacion"].value);
    model.fechaInvitacion = date.toISOString();

    model.juradoId = parseInt(this.form.controls["juradoId"].value);
    model.solicitudId = parseInt(this.form.controls["solicitudId"].value);

    this.service.SaveRecord(model).subscribe({
      next: (data: RequestModel) => {

        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/evaluation/evaluation-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
