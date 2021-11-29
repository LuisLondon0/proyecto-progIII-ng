import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { BondingModel } from 'src/app/models/parameters/bonding.model';
import { BondingService } from 'src/app/services/parameters/bonding.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-bonding-edition',
  templateUrl: './bonding-edition.component.html',
  styleUrls: ['./bonding-edition.component.css']
})
export class BondingEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: BondingService,
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
      next: (data: BondingModel) => {
        this.form.controls["id"].setValue(data.id);
        this.form.controls["nombre"].setValue(data.nombre);
      }
    })
  }

  EditRecord(){
    let model = new BondingModel();
    model.id = this.form.controls["id"].value;
    model.nombre = this.form.controls["nombre"].value;

    this.service.EditRecord(model).subscribe({
      next: (data: BondingModel) => {
        OpenGeneralMessageModal(GeneralData.EDITED_MESSAGE);
        this.router.navigate(["/parameters/bonding-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }
}