import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';
import { CommitteeService } from 'src/app/services/parameters/committee.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-committee-creation',
  templateUrl: './committee-creation.component.html',
  styleUrls: ['./committee-creation.component.css']
})
export class CommitteeCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CommitteeService
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
    let model = new CommitteeModel();
    model.nombre = this.form.controls["nombre"].value;

    this.service.SaveRecord(model).subscribe({
      next: (data: CommitteeModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/parameters/committee-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
