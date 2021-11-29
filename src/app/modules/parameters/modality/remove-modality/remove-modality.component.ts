import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { ModalityModel } from 'src/app/models/parameters/modality.model';
import { ModalityService } from 'src/app/services/parameters/modality.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-modality',
  templateUrl: './remove-modality.component.html',
  styleUrls: ['./remove-modality.component.css']
})
export class RemoveModalityComponent implements OnInit {
  
  id: number = 0;
  nombre: string = "";


  constructor(
    private router: Router,
    private service: ModalityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ModalityModel) => {
        if(data.id && data.nombre){
          this.id = data.id;
          this.nombre = data.nombre;
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: ModalityModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/parameters/modality-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}