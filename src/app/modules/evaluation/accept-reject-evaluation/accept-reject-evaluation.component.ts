import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { EvaluationModel } from 'src/app/models/evaluation/evaluation.model';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;


@Component({
  selector: 'app-accept-reject-evaluation',
  templateUrl: './accept-reject-evaluation.component.html',
  styleUrls: ['./accept-reject-evaluation.component.css']
})
export class AcceptRejectEvaluationComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: EvaluationService,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.GetOptionsToSelects();
  }

  GetOptionsToSelects() {
   
          InitSelectById("sel");
       
    }
  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      fechaRespuesta: ["", [Validators.required]],
      respuesta: ["", [Validators.required]],
      observaciones: ["", [Validators.required]],
    })
    
  }

  SaveRecord() {
    let model = new EvaluationModel();
    let id = parseInt(this.route.snapshot.params["id"]);
    this.form.controls["id"].setValue(id);
    model.id=parseInt(this.form.controls["id"].value)
    let date: Date = new Date(this.form.controls["fechaRespuesta"].value);
    model.fechaRespuesta = date.toISOString();
    
    model.respuesta = parseInt(this.form.controls["respuesta"].value);
    model.observaciones = this.form.controls["observaciones"].value;

    this.service.AceptarRechazar(model).subscribe({
      next: (data: EvaluationModel) => {

        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/evaluation/evaluation-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
