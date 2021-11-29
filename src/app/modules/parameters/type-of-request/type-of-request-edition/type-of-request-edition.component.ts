import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { TypeOfRequestModel } from 'src/app/models/parameters/type-of-request.model';
import { TypeOfRequestService } from 'src/app/services/parameters/type-of-request.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-type-of-request-edition',
  templateUrl: './type-of-request-edition.component.html',
  styleUrls: ['./type-of-request-edition.component.css']
})
export class TypeOfRequestEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TypeOfRequestService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm(){
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      formato: ["", [Validators.required]]
    })
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: TypeOfRequestModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["nombre"].setValue(data.nombre);
        this.form.controls["formato"].setValue(data.formato);
      }
    })
  }

  EditRecord(){
    let model = new TypeOfRequestModel();
    model.id = this.form.controls["id"].value;
    model.nombre = this.form.controls["nombre"].value;
    model.formato = this.form.controls["formato"].value;

    this.service.EditRecord(model).subscribe({
      next: (data: TypeOfRequestModel) => {
        OpenGeneralMessageModal(GeneralData.EDITED_MESSAGE);
        this.router.navigate(["/parameters/type-of-request-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}