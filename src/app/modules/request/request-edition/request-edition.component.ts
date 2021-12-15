import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { ModalityModel } from 'src/app/models/parameters/modality.model';
import { TypeOfRequestModel } from 'src/app/models/parameters/type-of-request.model';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { RequestProponentModel } from 'src/app/models/request/request-proponent.model';
import { RequestModel } from 'src/app/models/request/request.model';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';
import { ModalityService } from 'src/app/services/parameters/modality.service';
import { TypeOfRequestService } from 'src/app/services/parameters/type-of-request.service';
import { proponentService } from 'src/app/services/proponent/proponent.service';
import { RequestService } from 'src/app/services/request/request.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;

@Component({
  selector: 'app-request-edition',
  templateUrl: './request-edition.component.html',
  styleUrls: ['./request-edition.component.css']
})
export class RequestEditionComponent implements OnInit {

  modalityList: ModalityModel[] = [];
  typeOfRequestList: TypeOfRequestModel[] = [];
  lineOfResearchList: LineOfResearchModel[] = [];
  form: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: RequestService,
    private route: ActivatedRoute,
    private modalityService: ModalityService,
    private typeOfRequestService: TypeOfRequestService,
    private proponentService: proponentService,
    private lineOfResearchService: LineOfResearchService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.CreateFormFile();
    this.GetOptionsToSelects();
    this.SearchRecord();
  }

  GetOptionsToSelects() {
    this.modalityService.GetRecordList().subscribe({
      next: (data: ModalityModel[]) => {
        this.modalityList = data;
        setTimeout(() => {
          InitSelectById("selModality");
        }, 100)
      }
    })

    this.typeOfRequestService.GetRecordList().subscribe({
      next: (data: TypeOfRequestModel[]) => {
        this.typeOfRequestList = data;
        setTimeout(() => {
          InitSelectById("selTypeOfRequest");
        }, 100)
      }
    })

    this.lineOfResearchService.GetRecordList().subscribe({
      next: (data: LineOfResearchModel[]) => {
        this.lineOfResearchList = data;
        setTimeout(() => {
          InitSelectById("selLineOfResearch");
        }, 100)
      }
    })
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      fecha: ["", [Validators.required]],
      nombreTrabajo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      modalidadId: ["", [Validators.required]],
      areaInvestigacionId: ["", [Validators.required]],
      tipoSolicitudId: ["", [Validators.required]],
      archivoZip: ["", []],
      proponenteId: ["", [Validators.required]],
      comites: [[], [Validators.required]],
      proponentes: [[], [Validators.required]],
    })
  }

  CreateFormFile() {
    this.formFile = this.fb.group({
      file: ["", []]
    })
  }

  SearchRecord() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: RequestModel) => {
        if (data.fecha) {
          let date: Date = new Date(data.fecha);

          let horastr = `${date.getHours()}`
          if (date.getHours() < 10) {
            horastr = `0${date.getHours()}`
          }
          let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${horastr}:${date.getMinutes()}`

          this.form.controls["fecha"].setValue(str)

          this.form.controls["id"].setValue(data.id);
          this.form.controls["nombreTrabajo"].setValue(data.nombreTrabajo);
          this.form.controls["descripcion"].setValue(data.descripcion);
          this.form.controls["modalidadId"].setValue(data.modalidadId);
          this.form.controls["areaInvestigacionId"].setValue(data.areaInvestigacionId);
          this.form.controls["tipoSolicitudId"].setValue(data.tipoSolicitudId);
          this.form.controls["archivoZip"].setValue(data.archivoZip);

          let comites: string[] = []
          let proponentes: string[] = []

          this.service.GetComites(id).subscribe({
            next: (d: CommitteeModel[]) => {
              for (let c of d) {
                if (c.nombre) {
                  comites.push(" " + c.nombre)
                }
              }
              this.form.controls["comites"].setValue(comites);

              if (data.id) {
                this.service.GetProponents(data.id).subscribe({
                  next: (da: RequestProponentModel[]) => {
                    for (let rp of da) {
                      if (rp.proponenteId) {
                        this.proponentService.SearchRecord(rp.proponenteId).subscribe({
                          next: (d: ProponentModel) => {
                            proponentes.push(` ${d.primerNombre} ${d.primerApellido}`);
                            this.form.controls["proponentes"].setValue(proponentes);
                          }
                        })
                      }
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  }

  EditRecord() {
    let model = new RequestModel();
    model.id = this.form.controls["id"].value;

    let date : Date = new Date(this.form.controls["fecha"].value);

    model.fecha = date.toISOString();
    model.nombreTrabajo = this.form.controls["nombreTrabajo"].value;
    model.descripcion = this.form.controls["descripcion"].value;
    model.modalidadId = parseInt(this.form.controls["modalidadId"].value);
    model.areaInvestigacionId = parseInt(this.form.controls["areaInvestigacionId"].value);
    model.tipoSolicitudId = parseInt(this.form.controls["tipoSolicitudId"].value);
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

  OnChangeInputFile(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.formFile.controls["file"].setValue(file);
    }
  }

  UploadFile(){
    const formData = new FormData();
    formData.append("file", this.formFile.controls["file"].value);
    this.service.UploadFile(formData).subscribe({
      next: (data: UploadedFileModel) => {
        this.form.controls["archivoZip"].setValue(data.filename)
      }
    })
  }
}
