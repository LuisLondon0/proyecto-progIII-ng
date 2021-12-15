import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { UserCredentialsModel, UserCredentialsModelPass } from 'src/app/models/user-credencials.model';
import { SecurityService } from 'src/app/services/shared/security.service';
declare const OpenGeneralMessageModal: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  constructor(private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.CreateForm()
  }

  ResetPassword() {
  
      
     
      let modelo = new UserCredentialsModelPass();
      modelo.correo = this.GetForm['correo'].value
     
      this.securityService.ResetPassword(modelo).subscribe({
       next: (data: any) => {
          console.log(data);
          this.router.navigate(["security/login"])
          OpenGeneralMessageModal(GeneralData.VALID_FORM_MESSAGE)
      
        },
        error: (error: any) => {
          this.securityService.ResetPasswordJ(modelo).subscribe({
            next: (data: any) => {
               console.log(data);
               this.router.navigate(["security/login"])
               OpenGeneralMessageModal(GeneralData.VALID_FORM_MESSAGE)
           
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
      correo: ["", [Validators.required, Validators.email, Validators.minLength(GeneralData.EMAIL_MIN_LENGHT)]],
    
    });
  }


  get GetForm() {
    return this.form.controls;
  }

  
}
