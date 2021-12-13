import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { JuryModel } from 'src/app/models/parameters/jury.model';
import { JuryService } from 'src/app/services/parameters/jury.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-jury',
  templateUrl: './remove-jury.component.html',
  styleUrls: ['./remove-jury.component.css']
})
export class RemoveJuryComponent implements OnInit {
  
  id: number = 0;
  nombre: string = "";
  apellidos: string = "";
  correo: string = "";
  entidad: string = "";
  telefono: string = "";


  constructor(
    private router: Router,
    private service: JuryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: JuryModel) => {
        if(data.id && data.nombre && data.apellidos && data.correo && data.entidad && data.telefono){
          this.id = data.id;
          this.nombre = data.nombre;
          this.apellidos = data.apellidos;
          this.correo = data.correo;
          this.entidad = data.entidad;
          this.telefono = data.telefono;
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: JuryModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/parameters/jury-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}