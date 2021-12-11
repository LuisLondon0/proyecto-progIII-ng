import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { ModalityModel } from 'src/app/models/parameters/modality.model';
import { TypeOfRequestModel } from 'src/app/models/parameters/type-of-request.model';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { RequestModel } from 'src/app/models/request/request.model';
import { UploadedFileModel } from 'src/app/models/request/uploaded.file.model';
import { CommitteeService } from 'src/app/services/parameters/committee.service';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';
import { ModalityService } from 'src/app/services/parameters/modality.service';
import { TypeOfRequestService } from 'src/app/services/parameters/type-of-request.service';
import { proponentService } from 'src/app/services/proponent/proponent.service';
import { RequestService } from 'src/app/services/request/request.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;

@Component({
  selector: 'app-request-creation',
  templateUrl: './request-creation.component.html',
  styleUrls: ['./request-creation.component.css']
})
export class RequestCreationComponent implements OnInit {
  modalityList: ModalityModel[] = [];
  typeOfRequestList: TypeOfRequestModel[] = [];
  committeeList: CommitteeModel[] = [];
  proponentList: ProponentModel[] = [];
  lineOfResearchList: LineOfResearchModel[] = [];
  form: FormGroup = new FormGroup({});
  formFile: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: RequestService,
    private modalityService: ModalityService,
    private typeOfRequestService: TypeOfRequestService,
    private committeeService: CommitteeService,
    private proponentService: proponentService,
    private lineOfResearchService: LineOfResearchService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.CreateFormFile();
    this.GetOptionsToSelects();
  }

  GetOptionsToSelects(){
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
    
    this.proponentService.GetRecordList().subscribe({
      next: (data: ProponentModel[]) => {
        this.proponentList = data;
        setTimeout(() => {
          InitSelectById("selProponent");
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

    this.committeeService.GetRecordList().subscribe({
      next: (data: CommitteeModel[]) => {
        this.committeeList = data;
        setTimeout(() => {
          InitSelectById("selCommittee");
        }, 100)
      }
    })
  }

  CreateForm(){
    this.form = this.fb.group({
      fecha: ["", [Validators.required]],
      nombreTrabajo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      modalidadId: ["", [Validators.required]],
      areaInvestigacionId: ["", [Validators.required]],
      tipoSolicitudId: ["", [Validators.required]],
      archivoZip: ["", [Validators.required]],
      proponenteId: ["", [Validators.required]],
      comites: [[], [Validators.required]],
      proponentes: [[], [Validators.required]],
    })
  }

  CreateFormFile(){
    this.formFile = this.fb.group({
      file: ["", []]
    })
  }

  SaveRecord(){
    let model = new RequestModel();

    let date : Date = new Date(this.form.controls["fecha"].value);

    model.fecha = date.toISOString();
    model.nombreTrabajo = this.form.controls["nombreTrabajo"].value;
    model.descripcion = this.form.controls["descripcion"].value;
    model.modalidadId = parseInt(this.form.controls["modalidadId"].value);
    model.areaInvestigacionId = parseInt(this.form.controls["areaInvestigacionId"].value);
    model.tipoSolicitudId = parseInt(this.form.controls["tipoSolicitudId"].value);
    model.archivoZip = this.form.controls["archivoZip"].value;
    model.proponenteId = this.form.controls["proponenteId"].value;

    let proponentString = this.form.controls["proponentes"].value
    let proponentId = parseInt(proponentString[0])

     model.proponenteId = proponentId;

    this.service.SaveRecord(model).subscribe({
      next: (data: RequestModel) => {
        if(data.id){
          
          let stringCommittees = this.form.controls["comites"].value;
          let numbersCommittees = []
          
          for(let i of stringCommittees){
            numbersCommittees.push(parseInt(i))
          }

          this.service.SaveCommittees(data.id, numbersCommittees).subscribe({
            next: (dat: boolean) => {
              if(data.id){
                let stringProponents = this.form.controls["proponentes"].value;
                let numbersProponents = []
          
                for(let i of stringProponents){
                  numbersProponents.push(parseInt(i))
                }

                numbersProponents.shift()

                this.service.SaveProponents(data.id, numbersProponents).subscribe({
                  next: (da: boolean) => {
                    OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
                    this.router.navigate(["/request/request-list"])
                  },
                  error: (err: any) => {
                    OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
                  }
                });
              }
            },
            error: (err: any) => {
              OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
            }
          });
        }
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
