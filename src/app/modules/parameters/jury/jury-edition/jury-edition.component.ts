import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { JuryModel } from 'src/app/models/parameters/jury.model';
import { LineOfResearchModel } from 'src/app/models/parameters/line-of-research.model';
import { JuryService } from 'src/app/services/parameters/jury.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-jury-edition',
  templateUrl: './jury-edition.component.html',
  styleUrls: ['./jury-edition.component.css']
})
export class JuryEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: JuryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      correo: ["", [Validators.required]],
      entidad: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      lineaInvestigacions: [[], [Validators.required]],
    })
  }

  SearchRecord() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: JuryModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["nombre"].setValue(data.nombre);
        this.form.controls["apellidos"].setValue(data.apellidos);
        this.form.controls["correo"].setValue(data.correo);
        this.form.controls["entidad"].setValue(data.entidad);
        this.form.controls["telefono"].setValue(data.telefono);

        let lineasInvestigacion: string[] = []

        this.service.GetLineasInvestigacion(id).subscribe({
          next: (d: LineOfResearchModel[]) => {
            for (let l of d) {
              if (l.nombre) {
                lineasInvestigacion.push(" " + l.nombre)
              }
            }
            this.form.controls["lineaInvestigacions"].setValue(lineasInvestigacion);
          }
        })
      }
    })
  }

  EditRecord() {
    let model = new JuryModel();
    model.id = this.form.controls["id"].value;
    model.nombre = this.form.controls["nombre"].value;
    model.apellidos = this.form.controls["apellidos"].value;
    model.correo = this.form.controls["correo"].value;
    model.entidad = this.form.controls["entidad"].value;
    model.telefono = this.form.controls["telefono"].value;

    this.service.EditRecord(model).subscribe({
      next: (data: JuryModel) => {
        OpenGeneralMessageModal(GeneralData.EDITED_MESSAGE);
        this.router.navigate(["/parameters/jury-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}
