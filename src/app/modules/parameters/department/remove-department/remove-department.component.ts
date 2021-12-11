import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { DepartmentModel } from 'src/app/models/parameters/department.model';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { FacultyService } from 'src/app/services/parameters/faculty.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-remove-department',
  templateUrl: './remove-department.component.html',
  styleUrls: ['./remove-department.component.css']
})
export class RemoveDepartmentComponent implements OnInit {
  
  id: number = 0;
  nombre: string = "";
  facultadId: string = "";

  constructor(
    private router: Router,
    private service: DepartmentService,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: DepartmentModel) => {
        if(data.id && data.nombre && data.facultadId){
          this.id = data.id;
          this.nombre = data.nombre;

          this.facultyService.SearchRecord(data.facultadId).subscribe({
            next: (data: FacultyModel) => {
              if(data.nombre){
                this.facultadId = data.nombre
              }
            }
          })
        }
      }
    })
  }

  RemoveRecord(){
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: DepartmentModel) => {
        OpenGeneralMessageModal(GeneralData.REMOVED_MESSAGE);
        this.router.navigate(["/parameters/department-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}