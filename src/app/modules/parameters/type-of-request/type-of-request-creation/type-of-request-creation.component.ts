import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { TypeOfRequestModel } from 'src/app/models/parameters/type-of-request.model';
import { TypeOfRequestService } from 'src/app/services/parameters/type-of-request.service';

declare const OpenGeneralMessageModal: any; 

@Component({
  selector: 'app-type-of-request-creation',
  templateUrl: './type-of-request-creation.component.html',
  styleUrls: ['./type-of-request-creation.component.css']
})
export class TypeOfRequestCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TypeOfRequestService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm(){
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      formato: ["", [Validators.required]],
    })
  }

  SaveRecord(){
    let model = new TypeOfRequestModel();
    model.nombre = this.form.controls["nombre"].value;
    model.formato = this.form.controls["formato"].value;

    this.service.SaveRecord(model).subscribe({
      next: (data: TypeOfRequestModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/parameters/type-of-request-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
