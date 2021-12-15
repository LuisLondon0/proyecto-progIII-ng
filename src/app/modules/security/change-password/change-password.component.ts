import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { UserCredentialsModelChange } from 'src/app/models/user-credencials.model';
import { SecurityService } from 'src/app/services/shared/security.service';
import { SessionData } from 'src/app/models/session-data.model';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';
import { MD5 } from 'crypto-js';
declare const OpenGeneralMessageModal: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  _id: any = "";

  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.CreateForm()
    this.getid()


  }

  getid() {
    let usuario = this.localStorageService.GetUser()
    if (usuario._id) {

      this._id = usuario._id
    } else {
      this._id = usuario.id
    }

  }

  ChangePassword() {



    let modelo = new UserCredentialsModelChange()
    modelo.id_usuario = this._id
    modelo.idusuario = this._id
    modelo.clave_actual = MD5(this.GetForm['password_Ac'].value).toString()
    modelo.nueva_clave = MD5(this.GetForm['New_password'].value).toString()

    this.securityService.ChangePassword(modelo).subscribe({
      next: (data: any) => {
        OpenGeneralMessageModal(GeneralData.VALID_FORM_MESSAGE)
        console.log(data);
        this.router.navigate(["/home"])
      },
      error: (error: any) => {
   
        this.securityService.ChangePasswordJ(modelo).subscribe({
          next: (data: any) => {
            OpenGeneralMessageModal(GeneralData.VALID_FORM_MESSAGE)
            console.log(data);
            this.router.navigate(["/home"])
          },
          error: (error: any) => {
            OpenGeneralMessageModal(GeneralData.GENERAL_ERROR_MESSAGE)


          }
        })

      }
    })

  }


  CreateForm() {
    this.form = this.fb.group({

      password_Ac: ["", [Validators.required, Validators.minLength(GeneralData.PASSWORD_MIN_LENGHT)]],
      New_password: ["", [Validators.required, Validators.minLength(GeneralData.PASSWORD_MIN_LENGHT)]]

    });
  }


  get GetForm() {
    return this.form.controls;
  }

}
