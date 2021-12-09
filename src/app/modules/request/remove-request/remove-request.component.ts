import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { RequestModel } from 'src/app/models/request/request.model';
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
  modalidadId: number = 0;
  areaInvestigacionId: number = 0;
  tipoSolicitudId: number = 0;
  archivoZip: string = "";


  constructor(
    private router: Router,
    private service: RequestService,
    private route: ActivatedRoute,
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
          this.fecha = data.nombreTrabajo;
          this.descripcion = data.descripcion;
          this.modalidadId = data.modalidadId;
          this.areaInvestigacionId = data.areaInvestigacionId;
          this.tipoSolicitudId = data.tipoSolicitudId;
          //this.archivoZip = data.archivoZip;
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