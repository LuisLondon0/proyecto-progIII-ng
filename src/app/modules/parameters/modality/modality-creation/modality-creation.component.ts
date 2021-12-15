import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { ModalityModel } from 'src/app/models/parameters/modality.model';
import { ModalityService } from 'src/app/services/parameters/modality.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-modality-creation',
  templateUrl: './modality-creation.component.html',
  styleUrls: ['./modality-creation.component.css']
})
export class ModalityCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ModalityService
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
    let model = new ModalityModel();
    model.nombre = this.form.controls["nombre"].value;

    this.service.SaveRecord(model).subscribe({
      next: (data: ModalityModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/parameters/modality-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
