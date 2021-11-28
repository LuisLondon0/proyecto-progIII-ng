import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { RequestModel } from 'src/app/models/request/request.model';
import { RequestService } from 'src/app/services/request/request.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-request-creation',
  templateUrl: './request-creation.component.html',
  styleUrls: ['./request-creation.component.css']
})
export class RequestCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: RequestService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm(){
    this.form = this.fb.group({
      fecha: ["", [Validators.required]],
      nombreTrabajo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      modalidadId: ["", [Validators.required]],
      areaInvestigacionId: ["", [Validators.required]],
      tipoSolicitudId: ["", [Validators.required]],
      archivoZip: ["", []]
    })
  }

  SaveRecord(){
    let model = new RequestModel();
    model.fecha = this.form.controls["fecha"].value;
    model.nombreTrabajo = this.form.controls["nombreTrabajo"].value;
    model.descripcion = this.form.controls["descripcion"].value;
    model.modalidadId = this.form.controls["modalidadId"].value;
    model.areaInvestigacionId = this.form.controls["areaInvestigacionId"].value;
    model.tipoSolicitudId = this.form.controls["tipoSolicitudId"].value;
    model.archivoZip = this.form.controls["archivoZip"].value;

    this.service.SaveRecord(model).subscribe({
      next: (data: RequestModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/request/request-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
