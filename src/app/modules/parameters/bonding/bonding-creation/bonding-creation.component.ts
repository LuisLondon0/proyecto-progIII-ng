import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { BondingModel } from 'src/app/models/parameters/bonding.model';
import { BondingService } from 'src/app/services/parameters/bonding.service';

declare const OpenGeneralMessageModal: any;

@Component({
  selector: 'app-bonding-creation',
  templateUrl: './bonding-creation.component.html',
  styleUrls: ['./bonding-creation.component.css']
})
export class BondingCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: BondingService
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
    let model = new BondingModel();
    model.nombre = this.form.controls["nombre"].value;

    this.service.SaveRecord(model).subscribe({
      next: (data: BondingModel) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/parameters/bonding-list"])
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }

}
