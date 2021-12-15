import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { UserData } from 'src/app/models/user-data.model';
import { UserService } from '../../user.service';
declare const OpenGeneralMessageModal: any;
@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css']
})
export class UserEditionComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UserService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord()
  }

  SearchRecord(){
    let id = this.route.snapshot.params["id"]
    this.service.SearchRecord(id).subscribe({
      next: (data: UserData) => {
        this.form.controls['_id'].setValue(data._id)
        this.form.controls['nombre'].setValue(data.nombre)
        this.form.controls['correo'].setValue(data.correo)
        this.form.controls['celular'].setValue(data.celular)
        this.form.controls['id_rol'].setValue(data.id_rol)
      }
    });
  }


  CreateForm() {
    this.form = this.fb.group({
      _id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      correo: ["", [Validators.required, Validators.email, Validators.minLength(GeneralData.EMAIL_MIN_LENGHT)]],
      celular: ["", [Validators.required]],
      id_rol: ["", [Validators.required]]
     
    });
  }

  SaveRecord() {
    let model = new UserData();
    model._id=this.form.controls['_id'].value
    model.nombre = this.form.controls['nombre'].value;
    model.correo = this.form.controls['correo'].value
    model.celular= this.form.controls['celular'].value;
    model.id_rol= this.form.controls['id_rol'].value;
 
    this.service.EditRecord(model).subscribe({
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
