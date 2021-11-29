import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { FacultyService } from 'src/app/services/parameters/faculty.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-faculty',
  templateUrl: './remove-faculty.component.html',
  styleUrls: ['./remove-faculty.component.css']
})
export class RemoveFacultyComponent implements OnInit {
  
  id: number = 0;
  nombre: string = "";


  constructor(
    private router: Router,
    private service: FacultyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: FacultyModel) => {
        if(data.id && data.nombre){
          this.id = data.id;
          this.nombre = data.nombre;
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: FacultyModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/parameters/faculty-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}