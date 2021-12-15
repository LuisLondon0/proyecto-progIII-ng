import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { BondingModel } from 'src/app/models/parameters/bonding.model';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { BondingService } from 'src/app/services/parameters/bonding.service';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { proponentService } from 'src/app/services/proponent/proponent.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-proponent',
  templateUrl: './remove-proponent.component.html',
  styleUrls: ['./remove-proponent.component.css']
})
export class RemoveProponentComponent implements OnInit {
  id: number = 0;
  document: number = 0;
  firstName: string = "";
  otherName: string ="";
  firstLastName: string = "";
  otherLastName: string ="";
  email: string ="";
  phone: number = 0;
  typeVinculation: string ="";

  uploadedFilename?: string = "";
  uploadedFile: boolean = false;
  url: string= GeneralData.MS_BONDING_URL;

  constructor(
    private router: Router,
    private service: proponentService,
    private bondingService: BondingService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ProponentModel) => {
        if (data.id && data.primerNombre && data.otroNombre && data.primerApellido && data.otroApellido && data.documento && data.correo && data.celular && data.tipoVinculacionId) {
          this.id = data.id;
          this.document = data.documento
          this.firstName = data.primerNombre;
          this.otherName = data.otroNombre;
          this.firstLastName = data.primerApellido;
          this.otherLastName = data.otroApellido;
          this.email = data.correo;
          this.phone = data.celular;

          if(data.foto != null && data.foto != "" && data.foto != "string"){
            this.uploadedFilename = data.foto;
            this.uploadedFile = true;
          }

          this.bondingService.SearchRecord(data.tipoVinculacionId).subscribe({
            next: (data: BondingModel) => {
              if(data.nombre){
                this.typeVinculation = data.nombre
              }
            }
          })
        }
      }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: ProponentModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/proponent/proponent-list"]);
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
