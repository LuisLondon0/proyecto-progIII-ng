import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { JuryModel } from 'src/app/models/parameters/jury.model';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { JuryService } from 'src/app/services/parameters/jury.service';
import { LineOfResearchService } from 'src/app/services/parameters/line-of-research.service';

declare const OpenGeneralMessageModal: any;
declare const InitSelectById: any;

@Component({
  selector: 'app-jury-creation',
  templateUrl: './jury-creation.component.html',
  styleUrls: ['./jury-creation.component.css']
})
export class JuryCreationComponent implements OnInit {
  lineOfResearchList: LineOfResearchModel[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: JuryService,
    private lineOfResearchService: LineOfResearchService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.GetOptionsToSelects();
  }

  GetOptionsToSelects() {
    this.lineOfResearchService.GetRecordList().subscribe({
      next: (data: LineOfResearchModel[]) => {
        this.lineOfResearchList = data;
        setTimeout(() => {
          InitSelectById("selLineOfResearch");
        }, 100)
      }
    })
  }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      correo: ["", [Validators.required]],
      entidad: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      lineaInvestigacions: [[], [Validators.required]],
    })
  }

  SaveRecord() {
    let model = new JuryModel();

    model.nombre = this.form.controls["nombre"].value;
    model.apellidos = this.form.controls["apellidos"].value;
    model.correo = this.form.controls["correo"].value;
    model.entidad = this.form.controls["entidad"].value;
    model.telefono = this.form.controls["telefono"].value;

    this.service.SaveRecord(model).subscribe({
      next: (data: JuryModel) => {
        if (data.id) {

          let stringLinesOfResearch = this.form.controls["lineaInvestigacions"].value;
          let numbersLinesOfResearch = []

          for (let i of stringLinesOfResearch) {
            numbersLinesOfResearch.push(parseInt(i))
          }

          this.service.SaveLinesOfResearch(data.id, numbersLinesOfResearch).subscribe({
            next: (da: boolean) => {
              OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
              this.router.navigate(["/parameters/jury-list"])
            },
            error: (err: any) => {
              OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
            }
          });
        }
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}
