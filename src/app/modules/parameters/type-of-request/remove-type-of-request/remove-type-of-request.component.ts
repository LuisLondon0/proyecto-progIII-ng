import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { TypeOfRequestModel } from 'src/app/models/parameters/type-of-request.model';
import { TypeOfRequestService } from 'src/app/services/parameters/type-of-request.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-type-of-request',
  templateUrl: './remove-type-of-request.component.html',
  styleUrls: ['./remove-type-of-request.component.css']
})
export class RemoveTypeOfRequestComponent implements OnInit {
  
  id: number = 0;
  nombre: string = "";
  formato: string = "";


  constructor(
    private router: Router,
    private service: TypeOfRequestService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: TypeOfRequestModel) => {
        if(data.id && data.nombre && data.formato){
          this.id = data.id;
          this.nombre = data.nombre;
          this.formato = data.formato;
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: TypeOfRequestModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/parameters/type-of-request-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}