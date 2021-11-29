import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-line-of-research-creation',
  templateUrl: './line-of-research-creation.component.html',
  styleUrls: ['./line-of-research-creation.component.css']
})
export class LineOfResearchCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LineOfResearchService
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
    let model = new LineOfResearchModel();
    model.nombre = this.form.controls["nombre"].value;

    this.service.SaveRecord(model).subscribe({
      next: (data: LineOfResearchModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/parameters/line-of-research-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
