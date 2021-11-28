import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { ProponentModel } from 'src/app/models/proponent/proponent.model';
import { proponentService } from 'src/app/services/proponent/proponent.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-proponent-edition',
  templateUrl: './proponent-edition.component.html',
  styleUrls: ['./proponent-edition.component.css']
})
export class ProponentEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: proponentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      document: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      otherName: ["", [Validators.required]],
      firstLastName: ["", [Validators.required]],
      otherLastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      typeVinculationId: ["", [Validators.required]],
      department: ["", [Validators.required]],
      main_image:["", [Validators.required]]
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ProponentModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["name"].setValue(data.primerNombre);
        this.form.controls["document"].setValue(data.documento);
        this.form.controls["firstName"].setValue(data.primerNombre);
        this.form.controls["otherName"].setValue(data.otroNombre);
        this.form.controls["firstLastName"].setValue(data.primerApellido);
        this.form.controls["otherLastName"].setValue(data.otroApellido);
        this.form.controls["phone"].setValue(data.celular);
        this.form.controls["email"].setValue(data.correo);
        this.form.controls["typeVinculationId"].setValue(data.tipoVinculacion);
        this.form.controls["main_image"].setValue(data.main_image);
      }
    });
  }

  SaveRecord() {
    let model = new ProponentModel();
    model.documento = this.form.controls["document"].value;
    model.primerNombre = this.form.controls["firstName"].value;
    model.otroNombre = this.form.controls["otherName"].value;
    model.primerApellido = this.form.controls["firstLastName"].value;
    model.otroApellido = this.form.controls["otherLastName"].value;
    model.celular = this.form.controls["phone"].value;
    model.correo = this.form.controls["email"].value;
    model.tipoVinculacionId = this.form.controls["typeVinculationId"].value;
    model.main_image = this.form.controls["main_image"].value;
    this.service.EditRecord(model).subscribe({
      next: (data: ProponentModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/parameters/proponent-list"]);
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
