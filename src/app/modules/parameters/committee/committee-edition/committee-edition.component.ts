import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { CommitteeModel } from 'src/app/models/parameters/committee.model';
import { CommitteeService } from 'src/app/services/parameters/committee.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-committee-edition',
  templateUrl: './committee-edition.component.html',
  styleUrls: ['./committee-edition.component.css']
})
export class CommitteeEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CommitteeService,
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
      next: (data: CommitteeModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["nombre"].setValue(data.nombre);
      }
    })
  }

  EditRecord(){
    let model = new CommitteeModel();
    model.id = this.form.controls["id"].value;
    model.nombre = this.form.controls["nombre"].value;

    this.service.EditRecord(model).subscribe({
      next: (data: CommitteeModel) => {
        OpenGeneralMessageModal(GeneralData.EDITED_MESSAGE);
        this.router.navigate(["/parameters/committee-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}