import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { ModalityModel } from 'src/app/models/parameters/modality.model';
import { TypeOfRequestModel } from 'src/app/models/parameters/type-of-request.model';
import { RequestModel } from 'src/app/models/request/request.model';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';
import { ModalityService } from 'src/app/services/parameters/modality.service';
import { TypeOfRequestService } from 'src/app/services/parameters/type-of-request.service';
import { RequestService } from 'src/app/services/request/request.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-request',
  templateUrl: './remove-request.component.html',
  styleUrls: ['./remove-request.component.css']
})
export class RemoveRequestComponent implements OnInit {
  
  id: number = 0;
  fecha: string = "";
  nombreTrabajo: string = "";
  descripcion: string = "";
  modalidadId: string = "";
  areaInvestigacionId: string = "";
  tipoSolicitudId: string = "";
  archivoZip: string = "";


  constructor(
    private router: Router,
    private service: RequestService,
    private route: ActivatedRoute,
    private modalityService: ModalityService,
    private typeOfRequestService: TypeOfRequestService,
    private lineOfResearchService: LineOfResearchService
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: RequestModel) => {
        if(data.id && data.fecha && data.nombreTrabajo && data.descripcion && data.modalidadId && data.areaInvestigacionId && data.tipoSolicitudId){
          this.id = data.id;
          this.fecha = data.fecha;
          this.nombreTrabajo = data.nombreTrabajo;
          this.descripcion = data.descripcion;

          if(data.archivoZip){
            this.archivoZip = data.archivoZip;
          }

          this.modalityService.SearchRecord(data.modalidadId).subscribe({
            next: (data: ModalityModel) => {
              if(data.nombre){
                this.modalidadId = data.nombre
              }
            }
          })

          this.lineOfResearchService.SearchRecord(data.areaInvestigacionId).subscribe({
            next: (data: LineOfResearchModel) => {
              if(data.nombre){
                this.areaInvestigacionId = data.nombre
              }
            }
          })

          this.typeOfRequestService.SearchRecord(data.tipoSolicitudId).subscribe({
            next: (data: TypeOfRequestModel) => {
              if(data.nombre){
                this.tipoSolicitudId = data.nombre
              }
            }
          })
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: RequestModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/request/request-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}