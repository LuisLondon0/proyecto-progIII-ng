import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { ModalityModel } from 'src/app/models/parameters/modality.model';
import { ModalityService } from 'src/app/services/parameters/modality.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-modality-edition',
  templateUrl: './modality-edition.component.html',
  styleUrls: ['./modality-edition.component.css']
})
export class ModalityEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ModalityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm(){
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]]
    })
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ModalityModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["nombre"].setValue(data.nombre);
      }
    })
  }

  EditRecord(){
    let model = new ModalityModel();
    model.id = this.form.controls["id"].value;
    model.nombre = this.form.controls["nombre"].value;

    this.service.EditRecord(model).subscribe({
      next: (data: ModalityModel) => {
        OpenGeneralMessageModal(GeneralData.EDITED_MESSAGE);
        this.router.navigate(["/parameters/modality-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}
