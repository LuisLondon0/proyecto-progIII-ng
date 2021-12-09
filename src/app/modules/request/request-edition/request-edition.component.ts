import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { RequestModel } from 'src/app/models/request/request.model';
import { RequestService } from 'src/app/services/request/request.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-request-edition',
  templateUrl: './request-edition.component.html',
  styleUrls: ['./request-edition.component.css']
})
export class RequestEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: RequestService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm(){
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      fecha: ["", [Validators.required]],
      nombreTrabajo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      modalidadId: ["", [Validators.required]],
      areaInvestigacionId: ["", [Validators.required]],
      tipoSolicitudId: ["", [Validators.required]],
      archivoZip: ["", []]
    })
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: RequestModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["fecha"].setValue(data.fecha);
        this.form.controls["nombreTrabajo"].setValue(data.nombreTrabajo);
        this.form.controls["descripcion"].setValue(data.descripcion);
        this.form.controls["modalidadId"].setValue(data.modalidadId);
        this.form.controls["areaInvestigacionId"].setValue(data.areaInvestigacionId);
        this.form.controls["tipoSolicitudId"].setValue(data.tipoSolicitudId);
        this.form.controls["archivoZip"].setValue(data.archivoZip);
      }
    })
  }

  EditRecord(){
    let model = new RequestModel();
    model.id = this.form.controls["id"].value;
    model.fecha = this.form.controls["fecha"].value;
    model.nombreTrabajo = this.form.controls["nombreTrabajo"].value;
    model.descripcion = this.form.controls["descripcion"].value;
    model.modalidadId = this.form.controls["modalidadId"].value;
    model.areaInvestigacionId = this.form.controls["areaInvestigacionId"].value;
    model.tipoSolicitudId = this.form.controls["tipoSolicitudId"].value;
    model.archivoZip = this.form.controls["archivoZip"].value;

    this.service.EditRecord(model).subscribe({
      next: (data: RequestModel) => {
        OpenGeneralMessageModal(GeneralData.EDITED_MESSAGE);
        this.router.navigate(["/request/request-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}
