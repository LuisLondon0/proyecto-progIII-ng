import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { FacultyModel } from 'src/app/models/parameters/faculty.model';
import { FacultyService } from 'src/app/services/parameters/faculty.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-faculty-creation',
  templateUrl: './faculty-creation.component.html',
  styleUrls: ['./faculty-creation.component.css']
})
export class FacultyCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: FacultyService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm(){
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
    })
  }

  SaveRecord(){
    let model = new FacultyModel();
    model.nombre = this.form.controls["nombre"].value;

    this.service.SaveRecord(model).subscribe({
      next: (data: FacultyModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/parameters/faculty-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
