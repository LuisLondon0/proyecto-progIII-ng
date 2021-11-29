import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-line-of-research-edition',
  templateUrl: './line-of-research-edition.component.html',
  styleUrls: ['./line-of-research-edition.component.css']
})
export class LineOfResearchEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LineOfResearchService,
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
      next: (data: LineOfResearchModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["nombre"].setValue(data.nombre);
      }
    })
  }

  EditRecord(){
    let model = new LineOfResearchModel();
    model.id = this.form.controls["id"].value;
    model.nombre = this.form.controls["nombre"].value;

    this.service.EditRecord(model).subscribe({
      next: (data: LineOfResearchModel) => {
        OpenGeneralMessageModal(GeneralData.EDITED_MESSAGE);
        this.router.navigate(["/parameters/line-of-research-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}