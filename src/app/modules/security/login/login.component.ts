import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralData } from 'src/app/config/general-data';
import { UserCredentialsModel } from 'src/app/models/user-credencials.model';
import { MD5 } from 'crypto-js';
import { SecurityService } from 'src/app/services/shared/security.service';
//import { LocalStorageService } from 'src/app/services/shared/local-storage.service';
//import { SessionData } from 'src/app/models/session-data.model';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';
import { SessionData } from 'src/app/models/session-data.model';
declare const OpenGeneralMessageModal: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.CreateForm()
  }
  CreateForm() {
    this.form = this.fb.group({
      username: ["esteban.1701825703@ucaldas.edu.co", [Validators.required, Validators.email, Validators.minLength(GeneralData.EMAIL_MIN_LENGHT)]],
      password: ["jO4SyRnd", [Validators.required, Validators.minLength(GeneralData.PASSWORD_MIN_LENGHT)]]
    });
  }

  Login() {

    // OpenGeneralMessageModal(GeneralData.VALID_FORM_MESSAGE)

    let modelo = new UserCredentialsModel();
    modelo.username = this.GetForm['username'].value
    modelo.password = MD5(this.GetForm['password'].value).toString();
    this.securityService.Login(modelo).subscribe({
      next: (data: SessionData) => {
        console.log(data);
        this.localStorageService.SaveSessionData(data);
        data.isLoggedIn = true;
        this.securityService.RefreshSessionData(data);
        this.router.navigate(["/home"]);
      },
      error: (error: any) => {
        
        this.securityService.LoginJ(modelo).subscribe({
          next: (data: SessionData) => {
            console.log(data);
            this.localStorageService.SaveSessionData(data);
            data.isLoggedIn = true;
            this.securityService.RefreshSessionData(data);
            this.router.navigate(["/home"]);
          },
          error: (error: any) => {
            OpenGeneralMessageModal(GeneralData.INVALID_FORM_MESSAGE)
          }
        })
      }
    });

  }


  get GetForm() {
    return this.form.controls;
  }


}
