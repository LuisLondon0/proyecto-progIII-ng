import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { DepartmentModel } from 'src/app/models/parameters/department.model';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { DepartmentService } from 'src/app/services/parameters/department.service';
import { FacultyService } from 'src/app/services/parameters/faculty.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;

@Component({
  selector: 'app-department-edition',
  templateUrl: './department-edition.component.html',
  styleUrls: ['./department-edition.component.css']
})
export class DepartmentEditionComponent implements OnInit {
  facultyList: FacultyModel[] = [];
  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: DepartmentService,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.GetOptionsToSelects();
    this.SearchRecord();
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
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      facultadId: ["", [Validators.required]]
    })
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: DepartmentModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["nombre"].setValue(data.nombre);
        this.form.controls["facultadId"].setValue(data.facultadId);
      }
    })
  }

  EditRecord(){
    let model = new DepartmentModel();
    model.id = this.form.controls["id"].value;
    model.nombre = this.form.controls["nombre"].value;
    model.facultadId = parseInt(this.form.controls["facultadId"].value);

    this.service.EditRecord(model).subscribe({
      next: (data: DepartmentModel) => {
        OpenGeneralMessageModal(GeneralData.EDITED_MESSAGE);
        this.router.navigate(["/parameters/department-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}
