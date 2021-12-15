import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { UserData } from 'src/app/models/user-data.model';
import { UserService } from '../../user.service';
declare const OpenGeneralMessageModal: any;
@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UserService

  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      correo: ["", [Validators.required, Validators.email, Validators.minLength(GeneralData.EMAIL_MIN_LENGHT)]],
      celular: ["", [Validators.required]],
      id_rol: ["", [Validators.required]]
     
    });
  }

  SaveRecord() {
    let model = new UserData();
    model.nombre = this.form.controls['nombre'].value;
    model.correo = this.form.controls['correo'].value
    model.celular= this.form.controls['celular'].value;
    model.id_rol= this.form.controls['id_rol'].value;
 
    this.service.SaveRecord(model).subscribe({
      next: (data: UserData) => {
        OpenGeneralMessageModal(GeneralData.SAVED_MESSAGE);
        this.router.navigate(["/security/user-list"]);
      },
      error: (err: any) => {
        OpenGeneralMessageModal(GeneralData.ERROR_MESSAGE);
      }
    });
  }



}
