import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { DepartmentModel } from 'src/app/models/parameters/department.model';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { FacultyService } from 'src/app/services/parameters/faculty.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;

@Component({
  selector: 'app-department-creation',
  templateUrl: './department-creation.component.html',
  styleUrls: ['./department-creation.component.css']
})
export class DepartmentCreationComponent implements OnInit {
  facultyList: FacultyModel[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: DepartmentService,
    private facultyService: FacultyService,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.GetOptionsToSelects();
  }

  GetOptionsToSelects(){
    this.facultyService.GetRecordList().subscribe({
      next: (data: FacultyModel[]) => {
        this.facultyList = data;
        setTimeout(() => {
          InitSelectById("selFaculty");
        }, 100)
      }
    })
  }

  CreateForm(){
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      facultadId: ["", [Validators.required]],
    })
  }

  SaveRecord(){
    let model = new DepartmentModel();
    model.nombre = this.form.controls["nombre"].value;
    model.facultadId = parseInt(this.form.controls["facultadId"].value);

    this.service.SaveRecord(model).subscribe({
      next: (data: DepartmentModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/parameters/department-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
